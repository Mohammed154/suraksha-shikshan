import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '../firebase/config.js';

const STATUS_CONFIG = {
  reported:       { label: '📋 Reported',        bg: 'bg-gray-100 text-gray-600' },
  under_review:   { label: '🔍 Under Review',     bg: 'bg-yellow-100 text-yellow-700' },
  confirmed_scam: { label: '⛔ Confirmed Scam',   bg: 'bg-red-100 text-danger' },
  likely_phishing:{ label: '⚠️ Likely Phishing',  bg: 'bg-orange-100 text-orange-700' },
  confirmed_threat:{ label:'⛔ Confirmed Threat',  bg: 'bg-red-100 text-danger' },
};

export default function ScamDatabase() {
  const { t }    = useTranslation();
  const navigate = useNavigate();
  const [tab, setTab]       = useState('apps');
  const [apps, setApps]     = useState([]);
  const [links, setLinks]   = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const appsSnap  = await getDocs(query(collection(db, 'scamAppReports'),  orderBy('reportCount', 'desc'), limit(50)));
        const linksSnap = await getDocs(query(collection(db, 'spamLinkReports'), orderBy('reportCount', 'desc'), limit(50)));
        setApps(appsSnap.docs.map(d  => ({ id: d.id, ...d.data() })));
        setLinks(linksSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.warn('DB load failed:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredApps  = apps.filter(a  => a.appName?.toLowerCase().includes(search.toLowerCase()));
  const filteredLinks = links.filter(l => l.domain?.toLowerCase().includes(search.toLowerCase()));

  const total = apps.length + links.length;

  function generateComplaint(item, type) {
    const date = new Date().toLocaleDateString('en-IN');
    return `CYBERCRIME COMPLAINT — ${date}\n\nType: ${type === 'app' ? 'Scam App' : 'Phishing Link'}\n${
      type === 'app'
        ? `App Name: ${item.appName}\nPublisher: ${item.publisher || 'Unknown'}\nScam Type: ${item.scamType}`
        : `URL: ${item.url}\nDomain: ${item.domain}\nPlatform: ${item.platform}`
    }\nDescription: ${item.description}\nReports: ${item.reportCount}\n\nPlease investigate and take action.\nFile complaint at: https://cybercrime.gov.in`;
  }

  async function copyComplaint(item, type) {
    try {
      await navigator.clipboard.writeText(generateComplaint(item, type));
      alert(t('report.export_copied'));
    } catch { alert('Copy not supported on this browser'); }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/report')} className="text-navy font-bold text-2xl w-10 h-10 flex items-center justify-center">←</button>
        <div>
          <p className="font-gu text-xl-acc font-bold text-navy">{t('database.title')}</p>
          <p className="font-gu text-[14px] text-gray-500">{t('database.subtitle', { count: total })}</p>
        </div>
      </div>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t('database.search')}
        className="w-full border-2 border-gray-200 rounded-xl p-3 font-gu text-base-acc
                   text-slate focus:border-navy focus:outline-none min-h-[48px]"
      />

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
        {['apps', 'links'].map((key) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex-1 py-2 rounded-lg font-gu text-base-acc font-medium min-h-[44px] transition-all
                        ${tab === key ? 'bg-white text-navy shadow' : 'text-gray-500'}`}>
            {key === 'apps' ? t('database.tab_apps') : t('database.tab_links')}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center font-gu text-base-acc text-gray-400 py-8 animate-pulse">
          Loading...
        </div>
      )}

      {/* Hall of Shame header */}
      {!loading && (
        <div className="bg-danger/10 border-2 border-danger rounded-xl p-3 text-center">
          <p className="font-gu text-base-acc font-bold text-danger">{t('database.hall_shame')}</p>
        </div>
      )}

      {/* Results */}
      <div className="space-y-3">
        {tab === 'apps' && filteredApps.map((item) => {
          const sc = STATUS_CONFIG[item.status] || STATUS_CONFIG.reported;
          return (
            <div key={item.id} className="card border-2 border-gray-100 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="font-gu text-base-acc font-bold text-slate">{item.appName}</p>
                <span className={`text-[12px] px-2 py-1 rounded-full font-bold flex-shrink-0 ${sc.bg}`}>
                  {sc.label}
                </span>
              </div>
              {item.publisher && <p className="font-gu text-[14px] text-gray-500">📦 {item.publisher}</p>}
              <p className="font-gu text-[14px] text-gray-500">🚩 {item.scamType?.replace('_', ' ')}</p>
              <div className="flex items-center justify-between">
                <p className="font-gu text-[14px] text-danger font-bold">
                  {t('database.reports', { n: item.reportCount || 1 })}
                </p>
                <button onClick={() => copyComplaint(item, 'app')}
                  className="text-navy font-gu text-[13px] underline min-h-[40px] px-2">
                  📋 {t('report.export_complaint').split('(')[0]}
                </button>
              </div>
            </div>
          );
        })}

        {tab === 'links' && filteredLinks.map((item) => {
          const sc = STATUS_CONFIG[item.threatLevel] || STATUS_CONFIG.reported;
          return (
            <div key={item.id} className="card border-2 border-gray-100 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="font-gu text-base-acc font-bold text-danger break-all">{item.domain}</p>
                <span className={`text-[12px] px-2 py-1 rounded-full font-bold flex-shrink-0 ${sc.bg}`}>
                  {sc.label}
                </span>
              </div>
              <p className="font-gu text-[13px] text-gray-400 break-all">{item.url}</p>
              <p className="font-gu text-[14px] text-gray-500">📲 {item.platform} • 🚩 {item.scamCategory}</p>
              <div className="flex items-center justify-between">
                <p className="font-gu text-[14px] text-danger font-bold">
                  {t('database.reports', { n: item.reportCount || 1 })}
                </p>
                <button onClick={() => copyComplaint(item, 'link')}
                  className="text-navy font-gu text-[13px] underline min-h-[40px] px-2">
                  📋 {t('report.export_complaint').split('(')[0]}
                </button>
              </div>
            </div>
          );
        })}

        {!loading && tab === 'apps'  && filteredApps.length  === 0 && (
          <p className="font-gu text-base-acc text-gray-400 text-center py-8">{t('database.empty')}</p>
        )}
        {!loading && tab === 'links' && filteredLinks.length === 0 && (
          <p className="font-gu text-base-acc text-gray-400 text-center py-8">{t('database.empty')}</p>
        )}
      </div>
    </div>
  );
}

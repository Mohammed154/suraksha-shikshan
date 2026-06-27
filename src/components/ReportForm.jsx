import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, doc, writeBatch, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config.js';

export default function ReportForm({ type }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [form, setForm]     = useState({
    appName: '', appUrl: '', publisher: '', scamType: 'fake_loan',
    url: '', platform: 'whatsapp', scamCategory: 'phishing', description: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  async function submit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      if (type === 'app') {
        const appNameLower = form.appName.trim().toLowerCase();
        // Query existing reports for this app
        const q = query(collection(db, 'scamAppReports'), where('appName_lower', '==', appNameLower));
        const snap = await getDocs(q);
        const count = snap.size + 1;
        
        let newStatus = 'reported';
        if (count >= 10) newStatus = 'confirmed_scam';
        else if (count >= 3) newStatus = 'under_review';
        
        const batch = writeBatch(db);
        
        // Add new document
        const newDocRef = doc(collection(db, 'scamAppReports'));
        batch.set(newDocRef, {
          appName:         form.appName.trim(),
          appName_lower:   appNameLower,
          appUrl:          form.appUrl.trim(),
          publisher:       form.publisher.trim(),
          scamType:        form.scamType,
          description:     form.description.trim(),
          reportedAt:      serverTimestamp(),
          status:          newStatus,
          reportCount:     count,
        });
        
        // Update existing documents
        snap.forEach((doc) => {
          batch.update(doc.ref, { status: newStatus, reportCount: count });
        });
        
        await batch.commit();
      } else {
        let domain = '';
        try { domain = new URL(form.url).hostname.replace('www.', ''); } catch {}
        const domainLower = domain.toLowerCase().trim();
        
        // Query existing reports for this domain
        const q = query(collection(db, 'spamLinkReports'), where('domain', '==', domainLower));
        const snap = await getDocs(q);
        const count = snap.size + 1;
        
        let threatLevel = 'reported';
        if (count >= 10) threatLevel = 'confirmed_threat';
        else if (count >= 3) threatLevel = 'likely_phishing';
        
        const batch = writeBatch(db);
        
        // Add new document
        const newDocRef = doc(collection(db, 'spamLinkReports'));
        batch.set(newDocRef, {
          url:             form.url.trim(),
          domain:          domainLower,
          platform:        form.platform,
          scamCategory:    form.scamCategory,
          description:     form.description.trim(),
          reportedAt:      serverTimestamp(),
          threatLevel:     threatLevel,
          reportCount:     count,
        });
        
        // Update existing documents
        snap.forEach((doc) => {
          batch.update(doc.ref, { threatLevel, reportCount: count });
        });
        
        await batch.commit();
      }
      setStatus('success');
      setForm({ appName: '', appUrl: '', publisher: '', scamType: 'fake_loan', url: '', platform: 'whatsapp', scamCategory: 'phishing', description: '' });
    } catch (error) {
      console.error('Failed to submit report:', error);
      setStatus('error');
    }
  }

  const inputCls = 'w-full border-2 border-gray-200 rounded-xl p-3 font-gu text-base-acc text-slate focus:border-navy focus:outline-none min-h-[48px]';
  const labelCls = 'block font-gu text-base-acc font-bold text-navy mb-1';

  return (
    <form onSubmit={submit} className="space-y-4">
      {type === 'app' ? (
        <>
          <div>
            <label className={labelCls}>{t('report.app_name')} *</label>
            <input required value={form.appName} onChange={(e) => set('appName', e.target.value)}
              className={inputCls} placeholder="e.g. QuickRupee" />
          </div>
          <div>
            <label className={labelCls}>{t('report.app_url')}</label>
            <input value={form.appUrl} onChange={(e) => set('appUrl', e.target.value)}
              className={inputCls} placeholder="https://play.google.com/..." />
          </div>
          <div>
            <label className={labelCls}>{t('report.publisher')}</label>
            <input value={form.publisher} onChange={(e) => set('publisher', e.target.value)}
              className={inputCls} placeholder="Company / developer name" />
          </div>
          <div>
            <label className={labelCls}>{t('report.scam_type')}</label>
            <select value={form.scamType} onChange={(e) => set('scamType', e.target.value)}
              className={inputCls}>
              {Object.entries(t('report.scam_types', { returnObjects: true })).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <>
          <div>
            <label className={labelCls}>{t('report.url_label')} *</label>
            <input required value={form.url} onChange={(e) => set('url', e.target.value)}
              className={inputCls} placeholder="https://..." />
          </div>
          <div>
            <label className={labelCls}>{t('report.platform')}</label>
            <select value={form.platform} onChange={(e) => set('platform', e.target.value)}
              className={inputCls}>
              {Object.entries(t('report.platforms', { returnObjects: true })).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
        </>
      )}

      <div>
        <label className={labelCls}>{t('report.description')} *</label>
        <textarea required value={form.description}
          onChange={(e) => set('description', e.target.value)}
          className={inputCls + ' min-h-[100px] resize-none'}
          rows={3} />
      </div>

      <button type="submit" disabled={status === 'loading'}
        className="btn-primary w-full font-gu">
        {status === 'loading' ? '...' : t('report.submit')}
      </button>

      {status === 'success' && (
        <div className="bg-green-50 border-2 border-safe rounded-xl p-4 text-center font-gu text-base-acc text-safe font-bold">
          {t('report.submitted')}
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-50 border-2 border-danger rounded-xl p-4 text-center font-gu text-base-acc text-danger font-bold">
          {t('report.error')}
        </div>
      )}
    </form>
  );
}

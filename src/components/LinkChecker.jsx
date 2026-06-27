import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { motion, AnimatePresence } from 'framer-motion';

export default function LinkChecker() {
  const { t } = useTranslation();
  const [url, setUrl]       = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function check() {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const functions   = getFunctions();
      const checkLink   = httpsCallable(functions, 'checkLink');
      const { data }    = await checkLink({ url: url.trim() });
      setResult(data);
    } catch {
      setResult({ verdict: 'error' });
    } finally {
      setLoading(false);
    }
  }

  const verdictConfig = {
    safe:      { icon: '✅', bg: 'bg-green-50 border-safe', text: 'text-safe',  label: t('link_check.safe_result'),    action: t('link_check.safe_action') },
    dangerous: { icon: '⛔', bg: 'bg-red-50 border-danger', text: 'text-danger', label: t('link_check.danger_result'),  action: t('link_check.danger_action') },
    suspicious:{ icon: '⚠️', bg: 'bg-yellow-50 border-yellow-400', text: 'text-yellow-700', label: t('link_check.unknown'), action: t('link_check.danger_action') },
    invalid:   { icon: '❓', bg: 'bg-gray-50 border-gray-300', text: 'text-gray-600', label: t('link_check.unknown'), action: '' },
    error:     { icon: '❓', bg: 'bg-gray-50 border-gray-300', text: 'text-gray-600', label: t('link_check.unknown'), action: '' },
  };

  const vc = result ? (verdictConfig[result.verdict] || verdictConfig.error) : null;

  return (
    <div className="p-4 space-y-4">
      <div className="bg-navy rounded-2xl p-4">
        <p className="font-gu text-xl-acc font-bold text-white">{t('link_check.title')}</p>
        <p className="font-gu text-base-acc text-blue-200 mt-1">{t('link_check.subtitle')}</p>
      </div>

      <div className="card space-y-3">
        <textarea
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={t('link_check.placeholder')}
          rows={3}
          className="w-full border-2 border-gray-200 rounded-xl p-3 font-gu text-base-acc
                     text-slate focus:border-navy focus:outline-none resize-none"
        />
        <div className="flex gap-2">
          <button
            onClick={async () => {
              try {
                const text = await navigator.clipboard.readText();
                setUrl(text);
              } catch { /* clipboard not available */ }
            }}
            className="flex-1 border-2 border-navy text-navy rounded-xl font-gu text-base-acc
                       min-h-[48px] hover:bg-blue-50 transition-colors"
          >
            📋 Paste
          </button>
          <button
            onClick={check}
            disabled={loading || !url.trim()}
            className="flex-2 btn-primary px-8 font-gu"
          >
            {loading ? t('link_check.checking') : t('link_check.check_btn')}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {result && vc && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`card border-2 space-y-3 ${vc.bg}`}
          >
            <p className={`font-gu text-xl-acc font-bold ${vc.text}`}>
              {vc.icon} {vc.label}
            </p>
            {vc.action && (
              <p className={`font-gu text-base-acc ${vc.text}`}>{vc.action}</p>
            )}
            {result.domain && (
              <div className="border-t border-gray-200 pt-3 space-y-1">
                <p className="font-gu text-base-acc text-gray-500">
                  🌐 Domain: <strong>{result.domain}</strong>
                </p>
                {result.domainAgeDays !== null && (
                  <p className="font-gu text-base-acc text-gray-500">
                    📅 {t('link_check.domain_age', { days: result.domainAgeDays })}
                  </p>
                )}
                {result.isNewDomain && (
                  <p className="font-gu text-base-acc text-yellow-700 font-bold">
                    {t('link_check.new_domain_warning')}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* How to read a link guide */}
      <div className="card border-2 border-blue-100 space-y-2">
        <p className="font-gu text-base-acc font-bold text-navy">
          {t('i18n.language') === 'gu' ? 'Link ક્યારે Suspicious?' : 'When is a link suspicious?'}
        </p>
        {[
          ['🔴', '.xyz .click .win .loan .tk', 'Dangerous endings'],
          ['🟡', 'Brand name with extra words', 'e.g. sbi-update-kyc.com'],
          ['🟢', '.gov.in .co.in', 'Safe — Indian Government / certified'],
        ].map(([dot, pattern, desc]) => (
          <div key={pattern} className="flex gap-2 items-start">
            <span className="text-xl flex-shrink-0">{dot}</span>
            <div>
              <p className="font-gu text-base-acc font-bold text-slate">{pattern}</p>
              <p className="font-gu text-base-acc text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

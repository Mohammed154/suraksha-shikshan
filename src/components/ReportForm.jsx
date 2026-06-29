import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { reportScamApp, reportSpamLink } from '../utils/localDatabase.js';

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
        reportScamApp({
          appName: form.appName,
          appUrl: form.appUrl,
          publisher: form.publisher,
          scamType: form.scamType,
          description: form.description,
        });
      } else {
        reportSpamLink({
          url: form.url,
          platform: form.platform,
          scamCategory: form.scamCategory,
          description: form.description,
        });
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

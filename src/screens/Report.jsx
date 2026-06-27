import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReportForm from '../components/ReportForm.jsx';

export default function Report() {
  const { t }    = useTranslation();
  const navigate = useNavigate();
  const [tab, setTab] = useState('app');

  const tabs = [
    { key: 'app',  label: t('report.tab_app') },
    { key: 'link', label: t('report.tab_link') },
    { key: 'db',   label: t('report.tab_db') },
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="bg-navy rounded-2xl p-4">
        <p className="font-gu text-xl-acc font-bold text-white">{t('report.title')}</p>
        <p className="font-gu text-base-acc text-blue-200 mt-1">{t('report.subtitle')}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => key === 'db' ? navigate('/report/database') : setTab(key)}
            className={`flex-1 py-2 rounded-lg font-gu text-base-acc font-medium transition-all min-h-[44px]
                        ${tab === key && key !== 'db' ? 'bg-white text-navy shadow' : 'text-gray-500 hover:text-navy'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <ReportForm type={tab} />
    </div>
  );
}

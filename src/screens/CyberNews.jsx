import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSpeech } from '../hooks/useSpeech.js';
import newsData from '../content/news/cyber_news.json';

const CATEGORY_MAP = {
  all: 'all_categories',
  trending: 'cat_trending',
  banking: 'cat_banking',
  jobs: 'cat_jobs',
  advisory: 'cat_advisory',
};

export default function CyberNews() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { speak, stop, speaking } = useSpeech();
  const [category, setCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [readingId, setReadingId] = useState(null);

  const lang = i18n.language;

  const filteredNews = category === 'all'
    ? newsData
    : newsData.filter((item) => item.category === category);

  function handleRead(item) {
    if (speaking && readingId === item.id) {
      stop();
      setReadingId(null);
    } else {
      const text = `${item[lang].title}. ${item[lang].summary}. ${item[lang].content}. ${t('news.how_to_protect')} ${item[lang].tip}`;
      speak(text);
      setReadingId(item.id);
    }
  }

  return (
    <div className="p-4 space-y-4">
      {/* Top Bar with Back Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            stop();
            navigate('/dashboard');
          }}
          className="text-navy font-bold text-2xl w-10 h-10 flex items-center justify-center bg-white border-2 border-gray-100 rounded-xl hover:bg-gray-50 min-h-[44px]"
        >
          ←
        </button>
        <div>
          <h1 className="font-gu text-xl-acc font-bold text-navy">{t('news.title')}</h1>
          <p className="font-gu text-[13px] text-gray-500">{t('news.subtitle')}</p>
        </div>
      </div>

      {/* Category Horizontal Filter Tags */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
        {Object.entries(CATEGORY_MAP).map(([key, labelKey]) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-gu text-[14px] font-semibold whitespace-nowrap min-h-[38px] transition-all border-2
                        ${category === key
                          ? 'bg-navy text-white border-navy shadow-md'
                          : 'bg-white text-gray-600 border-gray-100 hover:border-gray-300'}`}
          >
            {key === 'all' ? t(`news.${labelKey}`) : t(`news.${labelKey}`)}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-4">
        {filteredNews.map((item) => {
          const isExpanded = expandedId === item.id;
          const isReading = speaking && readingId === item.id;
          const article = item[lang] || item.en;

          return (
            <div
              key={item.id}
              className={`card transition-all duration-300 border-2 overflow-hidden
                         ${isExpanded ? 'border-navy shadow-md' : 'border-gray-100 hover:border-gray-200'}`}
            >
              {/* Header section clickable to expand */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-4 cursor-pointer flex gap-3 items-start select-none"
              >
                <span className="text-3xl p-2 bg-slate-100 rounded-xl flex items-center justify-center select-none">
                  {item.icon}
                </span>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-400 font-semibold">{item.date} • {item.readTime}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-navy/10 text-navy font-bold uppercase tracking-wider text-[10px]">
                      {t(`news.cat_${item.category}`)}
                    </span>
                  </div>
                  <h3 className="font-gu text-base-acc font-bold text-slate leading-snug">
                    {article.title}
                  </h3>
                  {!isExpanded && (
                    <p className="font-gu text-[14px] text-gray-500 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  )}
                </div>
              </div>

              {/* Collapsible expanded section */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-4 border-t border-gray-50 bg-slate-50/50">
                  <p className="font-gu text-[15px] text-slate-700 leading-relaxed font-medium">
                    {article.content}
                  </p>

                  {/* Safety Tip Alert Box */}
                  <div className="bg-turmeric/10 border-2 border-turmeric rounded-xl p-3 space-y-1">
                    <h4 className="font-gu text-[14px] font-bold text-navy">
                      {t('news.how_to_protect')}
                    </h4>
                    <p className="font-gu text-[13px] text-slate-800 leading-relaxed">
                      {article.tip}
                    </p>
                  </div>

                  {/* TTS & Control Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => handleRead(item)}
                      className={`font-gu text-[13px] font-bold flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all min-h-[40px]
                                  ${isReading
                                    ? 'bg-danger text-white hover:bg-danger-dark'
                                    : 'bg-navy text-white hover:bg-navy-dark shadow-sm'}`}
                    >
                      {isReading ? (
                        <>
                          <span>{t('news.stop_news')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('news.listen_news')}</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setExpandedId(null)}
                      className="font-gu text-[13px] text-gray-400 font-semibold hover:text-navy px-2 py-1 min-h-[36px]"
                    >
                      {lang === 'gu' ? 'બંધ કરો' : 'Close'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

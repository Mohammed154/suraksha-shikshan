import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProgress } from "../hooks/useProgress.js";
import { useSpeech } from "../hooks/useSpeech.js";
import alerts from "../content/alerts/scam_alerts.json";
import newsData from "../content/news/cyber_news.json";

const CATEGORY_MAP = {
  all: 'all_categories',
  trending: 'cat_trending',
  banking: 'cat_banking',
  jobs: 'cat_jobs',
  advisory: 'cat_advisory',
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { progress } = useProgress();
  const [newsCategory, setNewsCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [readingId, setReadingId] = useState(null);
  const { speak, stop, speaking } = useSpeech();

  const lang = i18n.language;

  const totalLessons = 6;
  const doneLessons = progress.lessonsCompleted.length;
  const doneBadges = progress.badgesEarned.length;
  const progressPct = Math.round((doneLessons / totalLessons) * 100);
  const latestAlert = alerts[0];

  const filteredNews = newsCategory === 'all'
    ? newsData
    : newsData.filter((item) => item.category === newsCategory);

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

  function toggleLang() {
    const next = i18n.language === "gu" ? "en" : "gu";
    i18n.changeLanguage(next);
  }

  return (
    <div className="p-4 space-y-4">
      {/* Back to Portal / Main Website */}
      <div className="flex justify-between items-center text-xs font-semibold text-slate-500 pt-1">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 hover:text-navy transition-colors font-gu bg-white border border-slate-200 shadow-xs px-2.5 py-1 rounded-xl text-xs text-slate-700 font-bold active:scale-95 transition-all"
        >
          <span>←</span>
          <span>{t("nav.back_to_portal")}</span>
        </button>
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <p className="font-gu text-hero font-bold text-navy">
            {t("app_name")}
          </p>
          <p className="font-gu text-base-acc text-gray-500">{t("tagline")}</p>
        </div>
        <button
          onClick={toggleLang}
          className="border-2 border-navy text-navy rounded-full px-3 py-1 font-gu text-[14px]
                     min-h-[40px] hover:bg-navy hover:text-white transition-colors"
        >
          {lang === "gu" ? "EN" : "ગુ"}
        </button>
      </div>

      {/* Emergency button — most prominent */}
      <button
        onClick={() => navigate("/emergency")}
        className="btn-danger w-full text-xl-acc font-gu py-5 rounded-2xl flex items-center
                   justify-center gap-2 animate-pulse"
      >
        {t("home.emergency_btn")}
      </button>

      {/* Progress card */}
      <div className="card">
        <p className="font-gu text-base-acc font-bold text-navy mb-3">
          {t("home.progress")}
        </p>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-navy rounded-full transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between">
          <div className="text-center">
            <p className="font-bold text-2xl text-navy">
              {doneLessons}/{totalLessons}
            </p>
            <p className="font-gu text-[13px] text-gray-500">
              {t("home.lessons_done")}
            </p>
          </div>
          <div className="text-center">
            <p className="font-bold text-2xl text-turmeric">{doneBadges}</p>
            <p className="font-gu text-[13px] text-gray-500">
              {t("home.badges_earned")}
            </p>
          </div>
          <div className="text-center">
            <p className="font-bold text-2xl text-safe">{progressPct}%</p>
            <p className="font-gu text-[13px] text-gray-500">
              {lang === "gu" ? "પૂર્ણ" : "Done"}
            </p>
          </div>
        </div>
      </div>

      {/* Daily Tip */}
      <div className="card bg-blue-50 border-2 border-navy">
        <p className="font-gu text-base-acc font-bold text-navy mb-2">
          💡 {t("home.daily_tip")}
        </p>
        <p className="font-gu text-base-acc text-slate">{t("home.tip_text")}</p>
      </div>

      {/* Latest alert */}
      {latestAlert && (
        <div className="card bg-red-50 border-2 border-danger">
          <p className="font-gu text-base-acc font-bold text-danger mb-1">
            {latestAlert[lang]?.title || latestAlert.en.title}
          </p>
          <p className="font-gu text-base-acc text-slate">
            {latestAlert[lang]?.body || latestAlert.en.body}
          </p>
        </div>
      )}

      {/* Cyber Crime News & Awareness Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <p className="font-gu text-base-acc font-bold text-navy">
            📰 {t("news.title")}
          </p>
          <p className="font-gu text-[12px] text-gray-500">
            {t("news.subtitle")}
          </p>
        </div>

        {/* Category Horizontal Filter Tags */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
          {Object.entries(CATEGORY_MAP).map(([key, labelKey]) => (
            <button
              key={key}
              onClick={() => {
                stop();
                setNewsCategory(key);
                setExpandedId(null);
              }}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl font-gu text-[13px] font-semibold whitespace-nowrap transition-all border-2 min-h-[36px]
                          ${newsCategory === key
                            ? 'bg-navy text-white border-navy shadow-sm'
                            : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'}`}
            >
              {t(`news.${labelKey}`)}
            </button>
          ))}
        </div>

        {/* News List */}
        <div className="space-y-3">
          {filteredNews.map((item) => {
            const isExpanded = expandedId === item.id;
            const isReading = speaking && readingId === item.id;
            const article = item[lang] || item.en;

            return (
              <div
                key={item.id}
                className={`card transition-all duration-300 border-2 overflow-hidden bg-white
                           ${isExpanded ? 'border-navy shadow-md' : 'border-gray-100 hover:border-gray-200'}`}
              >
                {/* Clickable Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-3 cursor-pointer flex gap-3 items-start select-none"
                >
                  <span className="text-2xl p-1.5 bg-slate-100 rounded-xl flex items-center justify-center select-none">
                    {item.icon}
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-gray-400 font-semibold">{item.date}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-navy/10 text-navy font-bold uppercase tracking-wider">
                        {t(`news.cat_${item.category}`)}
                      </span>
                    </div>
                    <h3 className="font-gu text-[14px] font-bold text-slate leading-snug text-left">
                      {article.title}
                    </h3>
                    {!isExpanded && (
                      <p className="font-gu text-[12px] text-gray-500 line-clamp-1 leading-relaxed text-left">
                        {article.summary}
                      </p>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-3 pb-3 pt-1 space-y-3 border-t border-gray-50 bg-slate-50/50">
                    <p className="font-gu text-[13px] text-slate-700 leading-relaxed font-medium text-left">
                      {article.content}
                    </p>

                    {/* Safety Tip Alert Box */}
                    <div className="bg-turmeric/10 border-2 border-turmeric rounded-xl p-2.5 space-y-1 text-left">
                      <h4 className="font-gu text-[13px] font-bold text-navy">
                        {t('news.how_to_protect')}
                      </h4>
                      <p className="font-gu text-[12px] text-slate-800 leading-relaxed">
                        {article.tip}
                      </p>
                    </div>

                    {/* TTS & Close controls */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => handleRead(item)}
                        className={`font-gu text-[12px] font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all min-h-[34px]
                                    ${isReading
                                      ? 'bg-danger text-white hover:bg-danger-dark'
                                      : 'bg-navy text-white hover:bg-navy-dark shadow-xs'}`}
                      >
                        {isReading ? t('news.stop_news') : t('news.listen_news')}
                      </button>
                      <button
                        onClick={() => setExpandedId(null)}
                        className="font-gu text-[12px] text-gray-400 font-semibold hover:text-navy px-2 py-1 min-h-[32px]"
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

      {/* Start Learning CTA */}
      <button
        onClick={() => navigate("/lessons")}
        className="btn-primary w-full font-gu text-xl-acc py-5 rounded-2xl"
      >
        📚 {t("home.start_learning")}
      </button>
    </div>
  );
}

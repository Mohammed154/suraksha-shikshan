import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProgress } from "../hooks/useProgress.js";
import alerts from "../content/alerts/scam_alerts.json";

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { progress } = useProgress();
  const lang = i18n.language;

  const totalLessons = 6;
  const doneLessons = progress.lessonsCompleted.length;
  const doneBadges = progress.badgesEarned.length;
  const progressPct = Math.round((doneLessons / totalLessons) * 100);
  const latestAlert = alerts[0];

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

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LessonPanel from '../components/LessonPanel.jsx';
import QuizCard from '../components/QuizCard.jsx';
import BadgeModal from '../components/BadgeModal.jsx';
import { useProgress } from '../hooks/useProgress.js';

export default function Lesson() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const { t, i18n } = useTranslation();
  const { markLessonComplete, saveQuizScore, earnBadge, isLessonComplete } = useProgress();

  const [lesson, setLesson]   = useState(null);
  const [stage, setStage]     = useState('panels'); // panels | quiz | badge | done
  const [quizScore, setQuizScore] = useState(null);
  const lang = i18n.language;

  // Dynamically import lesson JSON
  useEffect(() => {
    import(`../content/lessons/${id}.json`)
      .then((mod) => setLesson(mod.default))
      .catch(() => navigate('/lessons'));
  }, [id, navigate]);

  async function onPanelsComplete() {
    setStage('quiz');
  }

  async function onQuizComplete(score, total) {
    setQuizScore({ score, total });
    await saveQuizScore(id, score, total);
    await markLessonComplete(id);
    await earnBadge(lesson.badge);
    setStage('badge');
  }

  function onBadgeContinue() {
    navigate('/lessons');
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="font-gu text-xl-acc text-navy animate-pulse">
          {lang === 'gu' ? 'લોડ થઈ રહ્યું છે...' : 'Loading...'}
        </div>
      </div>
    );
  }

  const content = lesson[lang] || lesson.en;

  function handleGoDashboard() {
    if (window.confirm(t('lessons.quit_alert'))) {
      navigate('/dashboard');
    }
  }

  function handleGoPortal() {
    if (window.confirm(t('lessons.quit_alert'))) {
      navigate('/');
    }
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-gu text-lg-acc font-bold text-navy leading-tight">{content.title}</p>
            <p className="font-gu text-[13px] text-gray-500 mt-0.5">{content.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleGoDashboard}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-navy font-bold px-2.5 py-1.5 rounded-xl transition-all shadow-sm active:scale-95 group font-gu text-xs"
            title={t('lessons.back_to_dashboard')}
          >
            <span className="text-sm group-hover:scale-110 transition-transform">🏠</span>
            <span className="text-navy/90 font-semibold">{t('lessons.back_to_dashboard')}</span>
          </button>
          <button onClick={handleGoPortal}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-navy font-bold px-2.5 py-1.5 rounded-xl transition-all shadow-sm active:scale-95 group font-gu text-xs"
            title={t('lessons.back_to_portal')}
          >
            <span className="text-sm group-hover:scale-110 transition-transform">🌐</span>
            <span className="text-navy/90 font-semibold">{t('lessons.back_to_portal')}</span>
          </button>
        </div>
      </div>

      {stage === 'panels' && (
        <LessonPanel lesson={lesson} onComplete={onPanelsComplete} />
      )}

      {stage === 'quiz' && (
        <div className="space-y-4">
          <div className="bg-turmeric/10 border-2 border-turmeric rounded-2xl p-4 text-center">
            <p className="font-gu text-xl-acc font-bold text-navy">📝 {t('quiz.title')}</p>
          </div>
          <QuizCard questions={lesson.quiz} onComplete={onQuizComplete} />
        </div>
      )}

      {stage === 'badge' && quizScore && (
        <>
          <div className="card text-center space-y-2">
            <p className="text-4xl">🎉</p>
            <p className="font-gu text-xl-acc font-bold text-safe">
              {t('quiz.score', { score: quizScore.score, total: quizScore.total })}
            </p>
          </div>
          <BadgeModal
            badge={lesson.badge}
            badgeLabel={lesson.badgeLabel}
            onContinue={onBadgeContinue}
          />
        </>
      )}
    </div>
  );
}

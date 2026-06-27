import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProgress } from '../hooks/useProgress.js';

// Lesson manifest — metadata only (full content loaded per-lesson)
const LESSONS = [
  { id: 'lesson_1_otp',     emoji: '🔢', color: 'bg-red-50   border-red-300'    },
  { id: 'lesson_2_prize',   emoji: '🎁', color: 'bg-orange-50 border-orange-300' },
  { id: 'lesson_3_link',    emoji: '🔗', color: 'bg-yellow-50 border-yellow-300' },
  { id: 'lesson_4_job',     emoji: '💼', color: 'bg-blue-50   border-blue-300'   },
  { id: 'lesson_5_upi',     emoji: '💳', color: 'bg-purple-50 border-purple-300' },
  { id: 'lesson_6_aadhaar', emoji: '🪪', color: 'bg-teal-50   border-teal-300'  },
];

export default function LessonList() {
  const { t, i18n }       = useTranslation();
  const navigate          = useNavigate();
  const { isLessonComplete, hasBadge } = useProgress();
  const lang = i18n.language;

  // Dynamic lesson title from JSON — loaded at module level for performance
  const lessonTitles = {
    gu: ['OTP ક્યારેય share ન કરો', 'ઇનામ સાચું નથી!', 'આ link safe છે?', 'નકલી નોકરી ફસાણ', 'UPI Request = ચૂકવણી!', 'Aadhaar સંભાળ'],
    en: ['Never Share Your OTP', 'That Prize Is Fake!', 'Is This Link Safe?', 'The Fake Job Trap', 'UPI Request = You Pay!', 'Protect Your Aadhaar'],
  };
  const subtitles = {
    gu: ['Bank account ઠગ', 'Lottery ઠગ', 'Phishing link', 'Fake job ઠગ', 'UPI collect ઠગ', 'Identity theft'],
    en: ['Bank account fraud', 'Lottery scam', 'Phishing link', 'Fake job scam', 'UPI collect scam', 'Identity theft'],
  };

  return (
    <div className="p-4 space-y-4">
      <div className="bg-navy rounded-2xl p-4">
        <p className="font-gu text-xl-acc font-bold text-white">{t('lessons.title')}</p>
        <p className="font-gu text-base-acc text-blue-200 mt-1">{t('lessons.subtitle')}</p>
      </div>

      <div className="space-y-3">
        {LESSONS.map(({ id, emoji, color }, i) => {
          const done   = isLessonComplete(id);
          // Unlock sequentially — lesson 1 always unlocked
          const locked = i > 0 && !isLessonComplete(LESSONS[i - 1].id);

          return (
            <button
              key={id}
              onClick={() => !locked && navigate(`/lessons/${id}`)}
              disabled={locked}
              className={`w-full card border-2 flex items-center gap-4 text-left
                          transition-all min-h-[80px]
                          ${locked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md active:scale-[0.98]'}
                          ${color}`}
            >
              <div className="text-4xl flex-shrink-0">{locked ? '🔒' : emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="font-gu text-base-acc font-bold text-slate leading-tight">
                  {(lessonTitles[lang] || lessonTitles.en)[i]}
                </p>
                <p className="font-gu text-[14px] text-gray-500 mt-0.5">
                  {(subtitles[lang] || subtitles.en)[i]}
                </p>
              </div>
              <div className="flex-shrink-0 text-xl">
                {done ? '✅' : locked ? '' : '▶️'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

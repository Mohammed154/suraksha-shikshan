import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceButton from './VoiceButton.jsx';

export default function QuizCard({ questions, onComplete }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [idx, setIdx]           = useState(0);
  const [selected, setSelected] = useState(null);
  const [scores, setScores]     = useState([]);

  const q = questions[idx];
  const questionText = q[lang] || q.en;
  const options      = q.options[lang] || q.options.en;
  const explanation  = q.explanation?.[lang] || q.explanation?.en;
  const answered     = selected !== null;
  const isCorrect    = selected === q.correct;

  function choose(i) {
    if (answered) return;
    setSelected(i);
    setScores((s) => [...s, i === q.correct ? 1 : 0]);
  }

  function next() {
    if (idx < questions.length - 1) {
      setIdx((i) => i + 1);
      setSelected(null);
    } else {
      const total = questions.length;
      const score = scores.reduce((a, b) => a + b, 0) + (selected === q.correct ? 1 : 0);
      onComplete(score, total);
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-gu text-base-acc text-gray-500">
          {t('quiz.question_of', { current: idx + 1, total: questions.length })}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${
              i < idx ? 'bg-navy' : i === idx ? 'bg-turmeric' : 'bg-gray-200'
            }`} />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="card space-y-4"
        >
          <p className="font-gu text-xl-acc font-bold text-slate">{questionText}</p>
          <VoiceButton text={questionText} />

          <div className="space-y-2">
            {options.map((opt, i) => {
              let cls = 'w-full text-left p-4 rounded-xl border-2 font-gu text-base-acc transition-all min-h-[56px]';
              if (!answered) {
                cls += ' border-gray-200 bg-white hover:border-navy hover:bg-blue-50';
              } else if (i === q.correct) {
                cls += ' border-safe bg-green-50 text-safe';
              } else if (i === selected && !isCorrect) {
                cls += ' border-danger bg-red-50 text-danger';
              } else {
                cls += ' border-gray-200 bg-white opacity-50';
              }
              return (
                <button key={i} className={cls} onClick={() => choose(i)}>
                  {answered && i === q.correct && <span>✅ </span>}
                  {answered && i === selected && !isCorrect && <span>❌ </span>}
                  {opt}
                </button>
              );
            })}
          </div>

          {answered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-xl p-4 ${isCorrect ? 'bg-green-50 border-2 border-safe' : 'bg-red-50 border-2 border-danger'}`}
            >
              <p className={`font-gu text-base-acc font-bold ${isCorrect ? 'text-safe' : 'text-danger'}`}>
                {isCorrect ? t('quiz.correct') : t('quiz.wrong')}
              </p>
              {explanation && (
                <p className="font-gu text-base-acc text-slate mt-1">{explanation}</p>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {answered && (
        <button onClick={next} className="btn-primary w-full font-gu">
          {idx < questions.length - 1
            ? t('lessons.next_panel')
            : t('quiz.finish')}
        </button>
      )}
    </div>
  );
}

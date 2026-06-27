import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceButton from './VoiceButton.jsx';

export default function LessonPanel({ lesson, onComplete }) {
  const { t, i18n } = useTranslation();
  const lang    = i18n.language;
  const content = lesson[lang] || lesson.en;
  const panels  = content.panels;

  const [panelIndex, setPanelIndex]     = useState(0);
  const [wrongChosen, setWrongChosen]   = useState(false);
  const [rightChosen, setRightChosen]   = useState(false);

  const panel = panels[panelIndex];
  const isLast = panelIndex === panels.length - 1;

  function next() {
    if (isLast) { onComplete(); return; }
    setWrongChosen(false);
    setRightChosen(false);
    setPanelIndex((i) => i + 1);
  }
  function prev() {
    if (panelIndex === 0) return;
    setWrongChosen(false);
    setRightChosen(false);
    setPanelIndex((i) => i - 1);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {panels.map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all
            ${i === panelIndex ? 'w-6 bg-navy' : i < panelIndex ? 'w-2 bg-navy/40' : 'w-2 bg-gray-200'}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={panelIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
          className="card"
        >
          {/* INTRO panel */}
          {panel.type === 'intro' && (
            <div className="text-center space-y-4">
              <div className="text-6xl">{panel.image}</div>
              <p className="font-gu text-xl-acc text-slate leading-relaxed">{panel.text}</p>
              <VoiceButton text={panel.text} />
            </div>
          )}

          {/* THREAT panel */}
          {panel.type === 'threat' && (
            <div className="space-y-4">
              {panel.isSimulation && (
                <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-3 text-center">
                  <span className="font-bold text-yellow-700 text-base-acc">
                    ⚠️ {panel.simulationLabel}
                  </span>
                </div>
              )}
              <div className="bg-gray-100 rounded-xl p-4 border-2 border-gray-300">
                <p className="font-gu text-base-acc text-slate">{panel.text}</p>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-danger font-gu text-base-acc">🚩 Red Flags:</p>
                {panel.redFlags.map((flag, i) => (
                  <div key={i} className="flex gap-2 items-start bg-red-50 rounded-lg p-3">
                    <span className="text-danger mt-1 flex-shrink-0">⚠️</span>
                    <p className="font-gu text-base-acc text-slate">{flag}</p>
                  </div>
                ))}
              </div>
              <VoiceButton text={panel.text + ' ' + panel.redFlags.join('. ')} />
            </div>
          )}

          {/* DECISION panel */}
          {panel.type === 'decision' && (
            <div className="space-y-4">
              <p className="font-gu text-xl-acc font-bold text-slate text-center">{panel.question}</p>
              <VoiceButton text={panel.question} />

              {!wrongChosen && !rightChosen && (
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => setRightChosen(true)}
                    className="btn-safe w-full text-left font-gu text-base-acc p-4 rounded-xl"
                  >
                    ✅ {panel.correct}
                  </button>
                  <button
                    onClick={() => setWrongChosen(true)}
                    className="btn-danger w-full text-left font-gu text-base-acc p-4 rounded-xl opacity-80"
                  >
                    ❌ {panel.wrong}
                  </button>
                </div>
              )}

              {wrongChosen && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-red-50 border-2 border-danger rounded-xl p-4 text-center"
                >
                  <p className="text-3xl mb-2">😟</p>
                  <p className="font-gu text-base-acc text-danger font-bold">
                    ❌ {lang === 'gu' ? 'ખોટો! આગળ જુઓ...' : 'Wrong choice! See what happens...'}
                  </p>
                  <button onClick={next} className="btn-primary mt-3 w-full">
                    {lang === 'gu' ? 'આગળ →' : 'See Result →'}
                  </button>
                </motion.div>
              )}

              {rightChosen && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-50 border-2 border-safe rounded-xl p-4 text-center"
                >
                  <p className="text-3xl mb-2">🎉</p>
                  <p className="font-gu text-base-acc text-safe font-bold">
                    ✅ {lang === 'gu' ? 'સાચો! આગળ જુઓ...' : 'Correct! See result...'}
                  </p>
                  <button onClick={next} className="btn-safe mt-3 w-full">
                    {lang === 'gu' ? 'આગળ →' : 'See Result →'}
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {/* CONSEQUENCE panel */}
          {panel.type === 'consequence' && (
            <div className="space-y-4">
              <div className="bg-red-50 border-2 border-danger rounded-xl p-4">
                <p className="font-gu text-base-acc text-danger">{panel.wrongOutcome}</p>
              </div>
              <div className="bg-green-50 border-2 border-safe rounded-xl p-4">
                <p className="font-gu text-base-acc text-safe">{panel.rightOutcome}</p>
              </div>
              <VoiceButton text={panel.rightOutcome} />
            </div>
          )}

          {/* TAKEAWAY panel */}
          {panel.type === 'takeaway' && (
            <div className="space-y-4 text-center">
              <div className="text-5xl">🛡️</div>
              <div className="bg-navy rounded-2xl p-5">
                <p className="font-gu text-xl-acc font-bold text-white leading-relaxed">
                  {panel.rule}
                </p>
              </div>
              {panel.subtext && (
                <p className="font-gu text-base-acc text-gray-600">{panel.subtext}</p>
              )}
              <VoiceButton text={panel.rule + '. ' + (panel.subtext || '')} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex gap-3">
        {panelIndex > 0 && (
          <button onClick={prev} className="flex-1 btn-primary bg-gray-200 text-slate hover:bg-gray-300 font-gu">
            {t('lessons.prev_panel')}
          </button>
        )}
        {panel.type !== 'decision' && (
          <button onClick={next} className="flex-1 btn-primary font-gu">
            {isLast
              ? (lang === 'gu' ? 'Quiz શરૂ કરો 📝' : 'Start Quiz 📝')
              : t('lessons.next_panel')}
          </button>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpeech } from '../hooks/useSpeech.js';

const OPTIONS = [
  { key: 'otp',     icon: '🔢', color: 'border-red-400 bg-red-50' },
  { key: 'link',    icon: '🔗', color: 'border-orange-400 bg-orange-50' },
  { key: 'money',   icon: '💸', color: 'border-red-600 bg-red-100' },
  { key: 'aadhaar', icon: '🪪', color: 'border-purple-400 bg-purple-50' },
];

export default function EmergencyHelp() {
  const { t }          = useTranslation();
  const { speak }      = useSpeech();
  const [chosen, setChosen] = useState(null);

  const steps = chosen ? t(`emergency.steps.${chosen}`, { returnObjects: true }) : [];

  function selectOption(key) {
    setChosen(key);
    const label = t(`emergency.options.${key}`);
    const stepsText = t(`emergency.steps.${key}`, { returnObjects: true }).join('. ');
    speak(label + '. ' + t('emergency.steps_title') + '. ' + stepsText);
  }

  return (
    <div className="p-4 space-y-4">
      <div className="bg-danger rounded-2xl p-4 text-center">
        <p className="font-gu text-hero font-bold text-white">{t('emergency.title')}</p>
        <p className="font-gu text-base-acc text-red-100 mt-1">{t('emergency.subtitle')}</p>
      </div>

      {/* Option tiles */}
      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map(({ key, icon, color }) => (
          <button
            key={key}
            onClick={() => selectOption(key)}
            className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 font-gu
                        text-base-acc font-bold text-slate min-h-[100px] transition-all
                        ${chosen === key ? 'ring-4 ring-navy scale-95' : 'hover:scale-95'}
                        ${color}`}
          >
            <span className="text-4xl">{icon}</span>
            <span className="text-center leading-tight">{t(`emergency.options.${key}`)}</span>
          </button>
        ))}
      </div>

      {/* Steps */}
      <AnimatePresence>
        {chosen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="bg-navy rounded-2xl p-4">
              <p className="font-gu text-lg-acc font-bold text-white">{t('emergency.steps_title')}</p>
            </div>
            {steps.map((step, i) => (
              <div key={i} className="card flex items-start gap-3">
                <div className="bg-danger text-white rounded-full w-8 h-8 flex items-center
                                justify-center font-bold text-sm flex-shrink-0 mt-1">
                  {i + 1}
                </div>
                <p className="font-gu text-base-acc text-slate">{step.replace(/^\d+\. /, '')}</p>
              </div>
            ))}

            {/* Helplines */}
            <div className="card bg-blue-50 border-2 border-navy">
              <p className="font-gu text-base-acc font-bold text-navy mb-3">
                {t('emergency.helplines')}
              </p>
              {[
                { label: t('emergency.cyber_helpline'), href: 'tel:1930' },
                { label: t('emergency.bank_helpline'),  href: 'tel:18001122211' },
                { label: t('emergency.uidai'),          href: 'tel:1947' },
              ].map(({ label, href }) => (
                <a key={href} href={href}
                   className="flex items-center gap-3 py-3 border-b border-blue-100 last:border-0">
                  <span className="text-2xl">📞</span>
                  <span className="font-gu text-base-acc text-navy font-bold">{label}</span>
                </a>
              ))}
            </div>

            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-danger w-full font-gu flex items-center justify-center gap-2"
            >
              📋 cybercrime.gov.in
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

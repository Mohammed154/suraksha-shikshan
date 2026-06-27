import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const BADGE_ICONS = {
  otp_warrior:       '🛡️',
  prize_detector:    '🎯',
  link_detective:    '🔍',
  job_shield:        '💼',
  upi_guardian:      '💳',
  identity_protector:'🪪',
};

export default function BadgeModal({ badge, badgeLabel, onContinue }) {
  const { t, i18n } = useTranslation();
  const label = badgeLabel?.[i18n.language] || badgeLabel?.en || badge;
  const icon  = BADGE_ICONS[badge] || '🏅';

  function shareOnWhatsApp() {
    const text = encodeURIComponent(
      `🛡️ Suraksha Shikshan — I earned the "${label}" badge!\nLearn digital safety: https://suraksha-shikshan.vercel.app`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
        initial={{ scale: 0.5, y: 60 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0.4 }}
      >
        <motion.div
          className="text-8xl mb-4"
          animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {icon}
        </motion.div>

        <div className="bg-turmeric/10 border-2 border-turmeric rounded-2xl p-4 mb-4">
          <p className="font-gu text-hero font-bold text-navy">{label}</p>
          <p className="font-gu text-base-acc text-gray-500 mt-1">{t('badge.earned')}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={shareOnWhatsApp}
            className="btn-safe w-full font-gu flex items-center justify-center gap-2"
          >
            📤 {t('badge.share')}
          </button>
          <button
            onClick={onContinue}
            className="btn-primary w-full font-gu"
          >
            {t('badge.continue')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

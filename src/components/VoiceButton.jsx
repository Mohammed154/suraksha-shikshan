import { useTranslation } from 'react-i18next';
import { useSpeech } from '../hooks/useSpeech.js';

export default function VoiceButton({ text, className = '' }) {
  const { t } = useTranslation();
  const { speak, stop, speaking, isSupported } = useSpeech();

  if (!isSupported) return null;

  return (
    <button
      onClick={() => speaking ? stop() : speak(text)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border-2
                  font-gu text-base-acc font-medium transition-all min-h-[48px]
                  ${speaking
                    ? 'bg-navy text-white border-navy animate-pulse'
                    : 'bg-white text-navy border-navy hover:bg-navy hover:text-white'}
                  ${className}`}
      aria-label={speaking ? t('lessons.stop') : t('lessons.listen')}
    >
      {speaking ? t('lessons.stop') : t('lessons.listen')}
    </button>
  );
}

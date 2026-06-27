import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function useSpeech() {
  const { i18n } = useTranslation();
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  // Map i18next locale → BCP-47 for speech synthesis
  const langMap = { gu: 'gu-IN', en: 'en-IN' };
  const speechLang = langMap[i18n.language] || 'gu-IN';

  const speak = useCallback((text) => {
    if (!window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel(); // stop any current speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang  = speechLang;
    utterance.rate  = 0.85;  // slightly slower — better for seniors
    utterance.pitch = 1;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend   = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [speechLang]);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  // Stop speech when component unmounts or language changes
  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, [i18n.language]);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  return { speak, stop, speaking, isSupported };
}

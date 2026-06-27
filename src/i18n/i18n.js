import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import gu from './gu.json';
import en from './en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      gu: { translation: gu },
      en: { translation: en },
    },
    lng: localStorage.getItem('ss_lang') || 'gu', // Gujarati default
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

// Persist language choice
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('ss_lang', lng);
  document.documentElement.lang = lng;
});

export default i18n;

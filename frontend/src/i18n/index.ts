import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

// Detect user's preferred language
const detectLanguage = (): string => {
  // Check localStorage first
  const savedLanguage = localStorage.getItem('preferred-language');
  if (savedLanguage && ['en', 'es'].includes(savedLanguage)) {
    return savedLanguage;
  }

  // Check browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('es')) {
    return 'es';
  }

  // Default to English
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: detectLanguage(),
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },

    // Performance optimizations
    load: 'languageOnly',
    preload: ['en', 'es'],
    
    // Debugging (disable in production)
    debug: process.env.NODE_ENV === 'development',

    // React-specific options
    react: {
      useSuspense: false,
    },
  });

export default i18n;
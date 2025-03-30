import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fiTexts from './texts/fi.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fi: { translation: fiTexts },
    },
    lng: 'fi', // Default language
    fallbackLng: 'fi',
    interpolation: { escapeValue: false },
  });

export default i18n;
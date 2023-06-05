import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { LOCALES } from "./locales";
import { English } from "./message/er";
import { French } from "./message/fr";

i18next.use(initReactI18next).init({
  resources: {
    [LOCALES.ENGLISH]: { translation: English },
    [LOCALES.FRENCH]: { translation: French },
  },
  lng: LOCALES.ENGLISH,
  fallbackLng: LOCALES.ENGLISH,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;

import {
    createContext,
    useContext,
    useState,
    type PropsWithChildren,
} from "react";

import { translations, type LanguageCode } from "@/i18n/translations";

type LocalizationContextType = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: keyof typeof translations.en) => string;
};

const LocalizationContext = createContext<LocalizationContextType | null>(null);

export function LocalizationProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<LanguageCode>("en");

  const value: LocalizationContextType = {
    language,
    setLanguage,
    t: (key) => translations[language][key],
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider",
    );
  }
  return context;
}

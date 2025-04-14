import React, { createContext, useContext, useState, useEffect } from "react";
import { useVisibility } from "./VisibilityContext";
import { callback } from "../utilites/callback";

const TranslationContext = createContext();

export const useTranslation = () => useContext(TranslationContext)

export const TranslationProvider = ({ children }) => {
  const { isVisible } = useVisibility();
  const [localTranslations, setLocalTranslations] = useState({});

  useEffect(() => {
    if (isVisible) {
      callback("getLocale").then((translations) => {
        if (translations) {
          setLocalTranslations(translations)
        }
      })
    }
  }, [isVisible]);

  const t = (key) => localTranslations[key] || "No translation";

  return (
    <TranslationContext.Provider value={{ t }}>
      {children}
    </TranslationContext.Provider>
  )
};
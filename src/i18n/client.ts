"use client";

import i18next from "i18next";
import {
  initReactI18next,
  UseTranslationOptions,
  useTranslation as useTranslationOrig,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultNS, fallbackLng, getOptions, languages } from ".";
import { useEffect } from "react";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    preload: languages,
  });

export function useTranslation(
  ns = defaultNS,
  lng: string = fallbackLng,
  options: UseTranslationOptions<string> = {}
) {
  const ret = useTranslationOrig(ns, options);
  const { i18n } = ret;

  useEffect(() => {
    //if (!lng || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng);
  }, [lng, i18n]);

  return ret;
}

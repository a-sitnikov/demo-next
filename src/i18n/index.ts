import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { UseTranslationOptions } from "react-i18next";
import { initReactI18next } from "react-i18next/initReactI18next";

export const fallbackLng = "ru";
export const languages = [fallbackLng];
export const defaultNS = "common";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}

const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useServerTranslation(
  ns: string = defaultNS,
  lng: string = fallbackLng,
  options: UseTranslationOptions<string> = {}
) {
  const i18nextInstance = await initI18next(lng, ns);

  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}

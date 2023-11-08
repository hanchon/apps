export const defaultLanguage = "en";
export const languages = [defaultLanguage, "pt"];

export const defaultNS = "common";
export const cookieName = "i18next";

export function getOptions(lng = defaultLanguage, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng: defaultLanguage,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}

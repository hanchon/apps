export const defaultLocale = "en";
export const languages = [defaultLocale];

export const defaultNS = "common";
export const cookieName = "i18next";

export function getOptions(lng = defaultLocale, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng: defaultLocale,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}

import { defaultLanguage } from "../settings";

let LOCALE = defaultLanguage;
export const setLocale = (locale: string) => {
  LOCALE = locale;
};

export const getLocale = () => {
  return LOCALE;
};

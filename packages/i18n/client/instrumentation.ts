"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { getOptions, languages } from "../settings";

const isServer = typeof window === "undefined";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      return import(`/locales/${language}/${namespace}.json`);
    })
  )
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: isServer ? languages : [],
  });

export function useTranslation(
  namespace = "translation",
  options: IDBTransactionOptions = {}
) {
  const [locale] = usePathname().split("/").filter(Boolean);
  if (!locale || !languages.includes(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }
  if (isServer) {
    i18next.changeLanguage(locale);
  } else {
    i18next.language = locale;
  }

  useEffect(() => {
    if (locale === i18next.language) return;
    i18next.changeLanguage(locale);
  }, [locale]);
  return useTranslationOrg(namespace, {
    lng: locale,
    i18n: i18next,
    ...options,
  });
}

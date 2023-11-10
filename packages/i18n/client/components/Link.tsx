"use client";
import NextLink from "next/link";
import { forwardRef } from "react";
import { languages } from "../../settings";
import { useTranslation } from "../instrumentation";
import { getLocaleFromPath } from "../..";

export const Link: typeof NextLink = forwardRef(({ href, ...props }, ref) => {
  let locale = getLocaleFromPath(href.toString());
  const { i18n } = useTranslation();
  if (
    (!locale || !languages.includes(locale)) &&
    !href.toString().startsWith("http")
  ) {
    locale = i18n.language;
    href = `/${locale}${href}`;
  }
  return <NextLink href={href} {...props} ref={ref} />;
});

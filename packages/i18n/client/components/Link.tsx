import NextLink from "next/link";
import { forwardRef } from "react";
import { languages } from "../../settings";
import { useTranslation } from "../instrumentation";

export const Link: typeof NextLink = forwardRef(({ href, ...props }, ref) => {
  let [locale] = href.toString().split("/").filter(Boolean);
  const { i18n } = useTranslation();
  if (!locale || !languages.includes(locale)) {
    locale = i18n.language;
    href = `/${locale}${href}`;
  }
  return <NextLink href={href} {...props} ref={ref} />;
});

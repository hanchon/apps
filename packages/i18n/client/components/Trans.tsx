"use client";
import { Trans as I18nTrans } from "react-i18next";
import { useTranslation } from "../instrumentation";

export const Trans: typeof I18nTrans = ({ ns, ...props }) => {
  const { t } = useTranslation(ns);
  return <I18nTrans t={t} {...props} />;
};

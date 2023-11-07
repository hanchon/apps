"use client";

import { Link, useTranslation } from "@evmosapps/i18n/client";

export const Test = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <h2>{t("heading")}</h2>
      {i18n.language}
      <Link href="/second">Test</Link>
    </div>
  );
};

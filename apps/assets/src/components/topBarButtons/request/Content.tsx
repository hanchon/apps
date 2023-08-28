// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Input, Subtitle, TokenCard } from "ui-helpers";
export const Content = () => {
  const [input, setInput] = useState("");
  const { t } = useTranslation();
  return (
    <section className="space-y-3">
      <Subtitle>{t("request.title")}</Subtitle>
      <Input
        placeholder={t("request.input.placeholder")}
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInput(e.target.value);
        }}
      />
      <Subtitle>{t("request.subtitle")}</Subtitle>
      <TokenCard />
    </section>
  );
};

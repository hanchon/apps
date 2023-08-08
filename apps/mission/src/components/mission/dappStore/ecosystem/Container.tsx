// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { Button } from "../Button";
import { EcosystemCard } from "./Card";
import { EcosystemProps, ecosystemData } from "./ecosystemData";
import { useTranslation } from "next-i18next";
import { ECOSYSTEM_URL, GOOGLE_FORM_URL } from "constants-helper";
export const EcosystemContainer = () => {
  const handleViewAlldApps = () => {
    window.open(ECOSYSTEM_URL, "_blank");
  };

  const drawEcosystemdApps = (dApps: EcosystemProps[]) => {
    return dApps.map((dApp) => <EcosystemCard key={dApp.name} data={dApp} />);
  };

  const { t } = useTranslation();

  return (
    <section className="space-y-6 pt-11">
      <div className="md:spacey-0 flex flex-col justify-between space-y-4 md:flex-row">
        <div className="space-y-1">
          <h1 className="text-2xl text-pearl">
            {t("dappStore.ecosystem.title")}
          </h1>
          <h2 className="text-[#FFFFFFB2]">
            {t("dappStore.ecosystem.description")}
            <Link
              className="ml-2 text-red"
              href={GOOGLE_FORM_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("dappStore.ecosystem.description2")}
            </Link>
          </h2>
        </div>
        <Button
          text={t("dappStore.ecosystem.button.text")}
          handleOnClick={handleViewAlldApps}
        />
      </div>
      <div className="grid gap-8 md:grid-cols-4">
        {drawEcosystemdApps(ecosystemData)}
      </div>
    </section>
  );
};

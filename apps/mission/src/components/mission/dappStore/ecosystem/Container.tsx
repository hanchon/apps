"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Button } from "../Button";
import { EcosystemCard } from "./Card";
import { EcosystemProps, ecosystemData } from "./ecosystemData";
import { useTranslation } from "@evmosapps/i18n/client";

import { ECOSYSTEM_URL } from "constants-helper";
import { useTracker, CLICK_ON_VIEW_ALL_DAPPS } from "tracker";
import { Title } from "ui-helpers/src/titles/Title";
import { Subtitle } from "ui-helpers/src/titles/Subtitle";
export const EcosystemContainer = () => {
  const { handlePreClickAction } = useTracker(CLICK_ON_VIEW_ALL_DAPPS);
  const handleViewAlldApps = () => {
    handlePreClickAction();
    window.open(ECOSYSTEM_URL, "_blank");
  };

  const drawEcosystemdApps = (dApps: EcosystemProps[]) => {
    return dApps.map((dApp) => <EcosystemCard data={dApp} key={dApp.name} />);
  };

  const { t } = useTranslation("dappStore");

  return (
    <section className="space-y-6 pt-11">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="space-y-1">
          <Title>Instant dApps</Title>
          <Subtitle>
            Earn yields & manage your assets in a few clicks using our instant
            apps
          </Subtitle>
        </div>
        {/* TODO: add arrow  */}
        <Button text="See More" handleOnClick={handleViewAlldApps} />
      </div>
      <div className="grid gap-x-8 md:grid-cols-4">
        {drawEcosystemdApps(ecosystemData)}
      </div>
    </section>
  );
};

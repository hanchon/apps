// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import useAssetsTopBar from "../../../../internal/functionality/hooks/useAssetsTopBar";
import { useHeaderInfo } from "../../../../internal/functionality/hooks/useHeaderInfo";
import { convertFromAtto } from "helpers";
import { Button } from "../Button";
import { StepsContext } from "copilot";
import { useContext } from "react";
import { useTranslation } from "next-i18next";
import { CLICK_ON_TOP_UP_ACCOUNT_DAPP, useTracker } from "tracker";
import dynamic from "next/dynamic";
const Copilot = dynamic(() => import("copilot").then((mod) => mod.Copilot));
export const AccountBalance = () => {
  const { totalStaked, totalRewards, wallet } = useHeaderInfo();
  const { evmosPrice, totalEvmosAsset } = useAssetsTopBar();

  const totalEvmos = totalEvmosAsset.add(totalStaked);
  // staked + evmos + rewards
  let totalBalance = Number(convertFromAtto(totalEvmos)) + totalRewards;

  const totalBalanceInDollars = totalBalance * Number(evmosPrice);

  const drawTotalBalance = () => {
    if (totalBalance === 0) {
      return 0;
    }
    if (totalBalance < 1) {
      return totalBalance.toFixed(2);
    }
    return totalBalance.toFixed(0);
  };

  const drawTotalBalanceInDollars = () => {
    if (isNaN(totalBalanceInDollars)) {
      return 0;
    }
    if (totalBalanceInDollars < 1) {
      return totalBalanceInDollars.toFixed(2);
    }
    return totalBalanceInDollars.toFixed(0);
  };

  const { setShowModal } = useContext(StepsContext);

  const { t } = useTranslation();

  const { handlePreClickAction } = useTracker(CLICK_ON_TOP_UP_ACCOUNT_DAPP);

  const handleClick = () => {
    handlePreClickAction({ location: "On the main page" });
    setShowModal(true);
  };
  return (
    <>
      <Copilot />
      <section className="text-center md:text-left">
        <p className="text-2xl text-pearl ">
          {t("dappStore.account.balance.title")}
        </p>
        <div className="flex flex-col items-center space-x-0 space-y-3 md:flex-row md:space-x-3 md:space-y-0">
          <h6 className="text-6xl font-bold text-white">
            {wallet.active ? drawTotalBalance() : "- "}
            <span className="ml-2 text-6xl font-bold uppercase text-white opacity-50">
              {t("evmos.token")}
            </span>
          </h6>
          {wallet.active && (
            <Button
              handleOnClick={handleClick}
              text={t("dappStore.account.balance.topUp")}
            />
          )}
        </div>
        <p className="mt-4 text-xl text-white opacity-50">
          $ {wallet.active ? drawTotalBalanceInDollars() : "-"}
        </p>
      </section>
    </>
  );
};

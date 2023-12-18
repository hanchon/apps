"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BalanceDisplay } from "./balance-display";

import { CardDescription } from "../card-description";
import { CardTitle } from "../card-title";
import { useSelector } from "react-redux";
import {
  StoreType,
  useAssets,
  useStake,
  useRewards,
  getBalance,
  getBalanceInDollars,
  getNumberBalance,
  getNumberBalanceInDollars,
} from "@evmosapps/evmos-wallet";
import { useTranslation } from "@evmosapps/i18n/client";
import { CLICK_ON_STAKE_AND_MANAGE_DELEGATION } from "tracker";
import { ButtonWithLink, TrackerEvent } from "@evmosapps/ui-helpers";
import { Card } from "../card";

export const StakingCard = () => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const { totalDelegations, totalRewards } = useStake();
  const { evmosPrice, totalEvmosAsset } = useAssets();
  const { handleConfirmButton } = useRewards(wallet);

  const { t } = useTranslation("dappStore");
  return (
    <Card>
      <>
        <div>
          <CardTitle firstWord={"Evmos"} secondWord={t("card.staking.title")} />
          <CardDescription text={t("card.staking.description")} />
          <hr className="text-pearl/30" />
        </div>
        <div className="grid grid-cols-1 space-y-3 md:grid-cols-2 md:space-y-0">
          <BalanceDisplay
            title={t("card.staking.available")}
            amount={getBalance(totalEvmosAsset, wallet.active)}
            amountInDollars={getBalanceInDollars(
              totalEvmosAsset,
              wallet.active,
              evmosPrice
            )}
            data-testid="card-available-balance"
          />
          <BalanceDisplay
            title={t("card.staking.staked")}
            amount={getBalance(totalDelegations, wallet.active)}
            amountInDollars={getBalanceInDollars(
              totalDelegations,
              wallet.active,
              evmosPrice
            )}
            data-testid="card-staked-balance"
          />
        </div>
        <hr className="text-pearl/30" />
        <div className="grid grid-cols-1 space-y-3 md:grid-cols-2 md:space-y-0 items-center">
          <BalanceDisplay
            title={t("card.staking.rewards")}
            amount={getNumberBalance(totalRewards, wallet.active)}
            amountInDollars={getNumberBalanceInDollars(
              totalRewards,
              wallet.active,
              evmosPrice
            )}
            data-testid="card-claimable-rewards"
          />
          <button
            onClick={handleConfirmButton}
            className={`w-fit h-fit flex space-x-2 rounded-lg bg-red-300 px-5 py-2 text-base font-bold normal-case text-pearl shadow transition-all duration-300 hover:bg-red1 hover:shadow-md active:bg-red2 
          ${
            !wallet.active || !totalRewards || totalRewards < 0.005
              ? "disabled"
              : ""
          }
        `}
          >
            {t("card.staking.button.claim")}
          </button>
        </div>
        <hr className="text-pearl/30" />

        <TrackerEvent event={CLICK_ON_STAKE_AND_MANAGE_DELEGATION}>
          <ButtonWithLink href="/staking" className="w-full">
            {t("card.staking.button.text")}
          </ButtonWithLink>
        </TrackerEvent>
      </>
    </Card>
  );
};

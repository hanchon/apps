import { useDispatch } from "react-redux";
import { useVestingPrecompile } from "../../../internal/useVestingPrecompile";
import { EXPLORER_URL } from "constants-helper";
import { getNetwork, switchNetwork } from "wagmi/actions";
import { E } from "helpers";
import { getEvmosChainInfo } from "evmos-wallet/src/wallet/wagmi/chains";
import { Dayjs } from "dayjs";
import { generateVestingSchedule } from "../../../internal/helpers/generate-vesting-schedule";
import {
  Intervals,
  TimeWindow,
  VestingSchedule,
} from "../../../internal/helpers/types";
import {
  addSnackbar,
  SNACKBAR_CONTENT_TYPES,
  SNACKBAR_TYPES,
  GENERATING_TX_NOTIFICATIONS,
  BROADCASTED_NOTIFICATIONS,
} from "evmos-wallet";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { setVestingAccountNameLocalstorage } from "../helpers";
import { BigNumber } from "@ethersproject/bignumber";
import { useSelector } from "react-redux";
import { StoreType } from "evmos-wallet";
import { useTranslation } from "next-i18next";

const evmos = getEvmosChainInfo();

export default function ExecuteFund({
  onClose,
  vestingAccount,
  vestingData
}: {
  onClose: () => void;
  vestingAccount: string;
  vestingData: FieldValues
}) {
  const dispatch = useDispatch();
  const { fundVestingAccount } = useVestingPrecompile();
  const [loading, setloading] = useState(false);
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const { t } = useTranslation();

  const handleOnClick = async () => {
    const connectedNetwork = getNetwork();
    if (connectedNetwork.chain?.id !== evmos.id) {
      const [err] = await E.try(() =>
        switchNetwork({
          chainId: evmos.id,
        }),
      );
      if (err) return;
    }
    try {
      setloading(true);

      const { lockupPeriods, vestingPeriods, startTime } =
        generateVestingSchedule(
          vestingData.startDate as Dayjs,
          BigNumber.from(vestingData.amount),
          "aevmos",
          {
            fullVestingPeriod: vestingData.vestingDuration as TimeWindow,
            vestingInterval: vestingData.vestingSchedule as Intervals,
            vestingCliff: vestingData.vestingCliff as VestingSchedule["vestingCliff"],
            lockingPeriod: vestingData.lockupDuration as TimeWindow,
          },
        );

      const res = await fundVestingAccount(
        wallet.evmosAddressEthFormat,
        vestingData.address as string,
        startTime,
        lockupPeriods,
        vestingPeriods,
      );

      dispatch(
        addSnackbar({
          id: 0,
          content: {
            type: SNACKBAR_CONTENT_TYPES.LINK,
            title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
            hash: res.hash,
            explorerTxUrl: `${EXPLORER_URL}/tx/`,
          },
          type: SNACKBAR_TYPES.SUCCESS,
        }),
      );
      setloading(false);
      onClose();
    } catch (e) {
      console.log(e)
      setloading(false);
      dispatch(
        addSnackbar({
          id: 0,
          content: {
            type: SNACKBAR_CONTENT_TYPES.TEXT,
            title: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
          },
          type: SNACKBAR_TYPES.ERROR,
        }),
      );
    }

    if (vestingData.accountName !== "") {
      setVestingAccountNameLocalstorage(
        vestingData.address as string,
        vestingData.accountName as string,
      );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-darkGray2 mb-4 w-[calc(100%-32px)] text-lg font-bold">
        {t("vesting.finish.fund.title")}
      </div>
      <div className="flex flex-col mb-6 ">
        <label htmlFor="address" className="text-xs font-bold">
          {t("vesting.fund.address.title")}
        </label>
        {vestingAccount}
      </div>
      <button
        onClick={handleOnClick}
        disabled={loading}
        style={{ backgroundColor: "#ed4e33" }}
        className={`w-full cursor-pointer rounded p-2 font-body text-lg text-pearl ${
          loading ? "opacity-40" : ""
        }`}
      >
        {loading ? "Loading..." : t("vesting.finish.fund.button")}
      </button>
    </div>
  );
}

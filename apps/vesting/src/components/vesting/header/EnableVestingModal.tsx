import { ModalTitle, Toggle } from "ui-helpers";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  enableAccountSchema,
  setVestingAccountNameLocalstorage,
} from "../helpers";

import {
  StoreType,
  addSnackbar,
  SNACKBAR_CONTENT_TYPES,
  SNACKBAR_TYPES,
  GENERATING_TX_NOTIFICATIONS,
  BROADCASTED_NOTIFICATIONS,
} from "evmos-wallet";
import { useSelector, useDispatch } from "react-redux";
import { useVestingPrecompile } from "../../../internal/useVestingPrecompile";
import { useTranslation } from "next-i18next";

export const EnableVestingModal = () => {
  const [disabled, setDisabled] = useState(false);
  const [govClawbackEnabled, setGovClawbackEnabled] = useState(false);
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();
  const { createClawbackVestingAccount } = useVestingPrecompile();

  const handleOnClick = async (d: FieldValues) => {
    try {
      setDisabled(true);

      const res = await createClawbackVestingAccount(
        d.address as string,
        wallet.evmosAddressEthFormat,
        govClawbackEnabled
      );

      dispatch(
        addSnackbar({
          id: 0,
          content: {
            type: SNACKBAR_CONTENT_TYPES.LINK,
            title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
            hash: res.hash,
            explorerTxUrl: "www.mintscan.io/evmos/txs/",
          },
          type: SNACKBAR_TYPES.SUCCESS,
        })
      );
      setDisabled(false);
    } catch (e) {
      console.log("errored", e);
      setDisabled(false);
      // TODO: Add Sentry here!
      dispatch(
        addSnackbar({
          id: 0,
          content: {
            type: SNACKBAR_CONTENT_TYPES.TEXT,
            title: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
          },
          type: SNACKBAR_TYPES.ERROR,
        })
      );
    }

    if (d.accountName !== "") {
      setVestingAccountNameLocalstorage(
        d.address as string,
        d.accountName as string
      );
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enableAccountSchema),
    defaultValues: { address: "" },
  });

  const { t } = useTranslation();
  return (
    <div className="space-y-5">
      <ModalTitle title={t("enable.modal.title")} />

      <form
        onSubmit={handleSubmit(async (d) => {
          await handleOnClick(d).then(() => {});
        })}
        className="flex flex-col space-y-3"
      >
        <label htmlFor="address" className="text-xs font-bold">
          {t("enable.modal.address.title")}
        </label>
        <input id="address" {...register("address")} />
        {errors.address?.message && (
          <span className="text-xs text-red">
            {errors.address.message.toString()}
          </span>
        )}

        <label htmlFor="address" className="text-xs font-bold">
          {t("enable.modal.governance.clawback")}
        </label>

        <div className="flex text-xs justify-between">
          <p className="flex gap-1">
            {t("enable.modal.toggle.description")}{" "}
            <span className="font-bold">
              {t("enable.modal.toggle.description.disabled")}
            </span>
          </p>
          <Toggle
            enabled={govClawbackEnabled}
            setEnabled={setGovClawbackEnabled}
          />
        </div>

        <input
          type="submit"
          disabled={disabled}
          style={{ backgroundColor: "#ed4e33" }}
          className="w-full cursor-pointer rounded p-2 font-[GreyCliff] text-lg font-bold uppercase text-pearl"
          value={t("enable.button.action.title")}
        />
      </form>
    </div>
  );
};

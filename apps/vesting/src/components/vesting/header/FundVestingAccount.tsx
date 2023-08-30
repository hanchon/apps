import {
  // ErrorContainer,
  ErrorMessage,
  ModalTitle,
  SelectMenu,
  // WizardHelper,
} from "ui-helpers";
import React, { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatNumber } from "helpers";
import {
  DEFAULT_FORM_VALUES,
  PlansType,
  dummyProps,
  getEndDate,
  schema,
  setVestingAccountNameLocalstorage,
  vestingSettingsConfig,
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
import { generateVestingSchedule } from "../../../internal/helpers/generate-vesting-schedule";
import {
  Intervals,
  TimeWindow,
  VestingSchedule,
} from "../../../internal/helpers/types";
import { useVestingPrecompile } from "../../../internal/useVestingPrecompile";
import { Dayjs } from "dayjs";
import { useTranslation } from "next-i18next";

export const FundVestingAccount = () => {
  const [disabled, setDisabled] = useState(false);
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();

  const { fundVestingAccount } = useVestingPrecompile();

  const handleOnClick = async (d: FieldValues) => {
    try {
      setDisabled(true);

      const { lockupPeriods, vestingPeriods, startTime } =
        generateVestingSchedule(
          d.startDate as Dayjs,
          d.amount as string,
          "atevmos",
          {
            fullVestingPeriod: d.vestingDuration as TimeWindow,
            vestingInterval: d.vestingSchedule as Intervals,
            vestingCliff: d.vestingCliff as VestingSchedule["vestingCliff"],
            lockingPeriod: d.lockupDuration as TimeWindow,
          }
        );

      const res = await fundVestingAccount(
        wallet.evmosAddressEthFormat,
        d.address as string,
        startTime,
        lockupPeriods,
        vestingPeriods
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
      console.log("catch", e);
      // TODO: Add Sentry here!
      setDisabled(false);
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
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const selectedPlanType: PlansType = watch("planType");
  const selectedStartDate = watch("startDate");
  const selectedVestingDuration = watch("vestingDuration");
  const selectedVestingCliff = watch("vestingCliff");
  const selectedVestingSchedule = watch("vestingSchedule");
  const selectedLockup = watch("lockupDuration");

  const endDate = useMemo(() => {
    return getEndDate(selectedStartDate, selectedVestingDuration);
  }, [selectedStartDate, selectedVestingDuration]);

  const { t } = useTranslation();
  return (
    <div className="space-y-5">
      <ModalTitle title={t("vesting.fund.title")} />

      <form
        onSubmit={handleSubmit(async (d) => {
          console.log(d);
          await handleOnClick(d).then(() => {});
        })}
        className="flex flex-col space-y-3"
      >
        <SelectMenu
          selected={selectedPlanType}
          label={t("vesting.fund.plan.title")}
          id="planType"
          options={[PlansType.Custom, PlansType.Team, PlansType.Grantee]}
          onChange={(e: string) => {
            const planType = e as PlansType;
            setValue("planType", planType);
            setValue(
              "vestingDuration",
              vestingSettingsConfig[planType].duration[0]
            );
            setValue("vestingCliff", vestingSettingsConfig[planType].cliff[0]);
            setValue(
              "vestingSchedule",
              vestingSettingsConfig[planType].schedule[0]
            );
            setValue(
              "lockupDuration",
              vestingSettingsConfig[planType].lockup[0]
            );
          }}
        />

        <div className="flex items-center justify-between space-x-2">
          <SelectMenu
            selected={selectedVestingDuration}
            label={t("vesting.fund.duration.title")}
            id="vestingDuration"
            options={vestingSettingsConfig[selectedPlanType]?.duration}
            disabled={vestingSettingsConfig[selectedPlanType]?.disabled}
            onChange={(e: string) => {
              setValue("vestingDuration", e as TimeWindow);
            }}
          />

          <SelectMenu
            selected={selectedVestingCliff}
            label={t("vesting.fund.cliff.title")}
            id="vestingCliff"
            options={vestingSettingsConfig[selectedPlanType]?.cliff}
            disabled={vestingSettingsConfig[selectedPlanType]?.disabled}
            onChange={(e: string) => {
              setValue("vestingCliff", e as TimeWindow);
            }}
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <SelectMenu
            selected={selectedVestingSchedule}
            label={t("vesting.fund.schedule.title")}
            id="vestingSchedule"
            options={vestingSettingsConfig[selectedPlanType]?.schedule}
            disabled={vestingSettingsConfig[selectedPlanType]?.disabled}
            onChange={(e: string) => {
              setValue("vestingSchedule", e as Intervals);
            }}
          />

          <SelectMenu
            selected={selectedLockup}
            label={t("vesting.fund.lockup.title")}
            id="lockupDuration"
            options={vestingSettingsConfig[selectedPlanType]?.lockup}
            disabled={vestingSettingsConfig[selectedPlanType]?.disabled}
            onChange={(e: string) => {
              setValue("lockupDuration", e as TimeWindow);
            }}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="startDate" className="text-xs font-bold">
            {t("vesting.fund.start.date.title")}
          </label>
          <div className="text-right text-[10px]">
            {endDate !== undefined && endDate[0] && (
              <p>
                {t("vesting.fund.end.date.title")} {endDate[1]}
              </p>
            )}
            <p>{t("vesting.fund.end.date.description")}</p>
          </div>
        </div>
        <input
          id="startDate"
          type="date"
          {...register("startDate")}
          className="textBoxStyle"
        />
        {errors.startDate?.message && (
          <ErrorMessage text={errors.startDate.message.toString()} />
        )}

        <label htmlFor="address" className="text-xs font-bold">
          {t("vesting.fund.address.title")}
        </label>
        <input id="address" {...register("address")} className="textBoxStyle" />
        {errors.address?.message && (
          <ErrorMessage text={errors.address.message.toString()} />
        )}

        {/* TODO: show the correct message depending on the address */}
        {/* <ErrorContainer description={t("enable.error")} />

        <ErrorContainer description={t("fund.create.error")} />

        <ErrorContainer description={t("fund.already.funded.error")} />

        <WizardHelper>
          <p>
            {t("fund.alert.governance.clawback")}{" "}
            <b>{t("fund.alert.governance.clawback.support")}</b>{" "}
            {t("fund.alert.governance.clawback.description")}
          </p>
        </WizardHelper>

        <WizardHelper>
          <p>
            {t("fund.alert.governance.clawback")}{" "}
            <b>{t("fund.alert.governance.clawback.not.support")}</b>{" "}
            {t("fund.alert.governance.clawback.description")}
          </p>
        </WizardHelper> */}

        <label
          htmlFor="accountName"
          className="flex justify-between text-xs font-bold"
        >
          {t("vesting.fund.account.name.title")}
        </label>
        <input
          id="accountName"
          {...register("accountName")}
          className="textBoxStyle"
        />
        {errors.accountName?.message && (
          <ErrorMessage text={errors.accountName.message.toString()} />
        )}

        <label htmlFor="amount" className="flex justify-between text-xs">
          <span className="font-bold">{t("vesting.fund.amount.title")}</span>
          <span>
            {t("vesting.fund.amount.description")}{" "}
            {formatNumber(dummyProps.available)} EVMOS
          </span>
        </label>
        <input
          type="number"
          id="amount"
          {...register("amount", { valueAsNumber: true })}
          className="textBoxStyle"
        />
        {errors.amount?.message && (
          <ErrorMessage text={errors.amount.message.toString()} />
        )}

        <input
          type="submit"
          disabled={disabled}
          style={{ backgroundColor: "#ed4e33" }}
          className="w-full cursor-pointer rounded p-2 font-[GreyCliff] text-lg text-pearl"
          value={t("vesting.fund.button.action.title")}
        />
      </form>
    </div>
  );
};

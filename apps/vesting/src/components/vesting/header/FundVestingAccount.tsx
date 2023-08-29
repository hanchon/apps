import { ErrorMessage, ModalTitle, SelectMenu } from "ui-helpers";
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

  return (
    <div className="space-y-5">
      <ModalTitle title="Create Vesting Account" />

      <form
        onSubmit={handleSubmit(async (d) => {
          console.log(d);
          await handleOnClick(d).then(() => {});
        })}
        className="flex flex-col space-y-3"
      >
        <SelectMenu
          selected={selectedPlanType}
          label="PLAN TYPE"
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
            label="VESTING DURATION"
            id="vestingDuration"
            options={vestingSettingsConfig[selectedPlanType]?.duration}
            disabled={vestingSettingsConfig[selectedPlanType]?.disabled}
            onChange={(e: string) => {
              setValue("vestingDuration", e as TimeWindow);
            }}
          />

          <SelectMenu
            selected={selectedVestingCliff}
            label="VESTING CLIFF"
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
            label="VESTING SCHEDULE"
            id="vestingSchedule"
            options={vestingSettingsConfig[selectedPlanType]?.schedule}
            disabled={vestingSettingsConfig[selectedPlanType]?.disabled}
            onChange={(e: string) => {
              setValue("vestingSchedule", e as Intervals);
            }}
          />

          <SelectMenu
            selected={selectedLockup}
            label="LOCKUP DURATION"
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
            START DATE
          </label>
          <div className="text-right text-[10px]">
            {endDate !== undefined && endDate[0] && (
              <p>END DATE: {endDate[1]}</p>
            )}
            <p>(i) The start time will default to 0:00 UTC</p>
          </div>
        </div>
        <input
          id="startDate"
          type="date"
          {...register("startDate")}
          className="textBoxStyle"
        />
        {errors.startDate?.message && (
          <span className="text-xs text-red">
            {errors.startDate.message.toString()}
          </span>
        )}

        <label htmlFor="address" className="text-xs font-bold">
          ADDRESS
        </label>
        <input id="address" {...register("address")} className="textBoxStyle" />
        {errors.address?.message && (
          <ErrorMessage text={errors.address.message.toString()} />
        )}

        <label
          htmlFor="accountName"
          className="v flex justify-between text-xs font-bold"
        >
          ACCOUNT NAME
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
          <span className="font-bold">AMOUNT</span>
          <span>Available: {formatNumber(dummyProps.available)} EVMOS</span>
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
          className="w-full cursor-pointer rounded p-2 font-[GreyCliff] text-lg font-bold uppercase text-pearl"
          value="Create"
        />
      </form>
    </div>
  );
};

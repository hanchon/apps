import { ModalTitle } from "ui-helpers";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formatNumber } from "helpers";
import {
  Duration,
  PlansType,
  dummyProps,
  getEndDate,
  plans,
  schema,
  setVestingAccountNameLocalstorage,
} from "./helpers";

export const CreateAccountModal = () => {
  const handleOnClick = (d: FieldValues) => {
    // TODO: logic for create account modal
    if (d.accountName !== "") {
      setVestingAccountNameLocalstorage(d.accountName);
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const selectedPlanType: PlansType = watch("planType");
  const selectedStartDate = watch("startDate");
  const selectedVestingDuration = watch("vestingDuration");

  const endDate = getEndDate(selectedStartDate, selectedVestingDuration);

  const vestingSettingsConfig = {
    [PlansType.Team]: {
      duration: [Duration.FourYears],
      cliff: [Duration.OneYear],
      schedule: [Duration.Monthly],
      lockup: [Duration.OneYear],
      disabled: true,
    },
    [PlansType.Grantee]: {
      duration: [Duration.OneYear],
      cliff: [Duration.OneDay],
      schedule: [Duration.Monthly],
      lockup: [Duration.OneYear],
      disabled: true,
    },
    [PlansType.Custom]: {
      duration: [Duration.FourYears, Duration.OneYear],
      cliff: [
        Duration.None,
        Duration.OneYear,
        Duration.OneMonth,
        Duration.OneDay,
      ],
      schedule: [Duration.Monthly, Duration.Quarterly],
      lockup: [Duration.None, Duration.OneYear, Duration.OneMonth],
      disabled: false,
    },
  };

  const DEFAULT_TYPE = vestingSettingsConfig[PlansType.Team];
  const [type, setType] = useState(DEFAULT_TYPE);

  useEffect(() => {
    setType(vestingSettingsConfig[selectedPlanType]);
  }, [selectedPlanType, vestingSettingsConfig]);
  return (
    <div className="space-y-5">
      <ModalTitle title="Create Vesting Account" />

      <form
        onSubmit={handleSubmit((d) => {
          // console.log(d);
          handleOnClick(d);
        })}
        className="flex flex-col space-y-3"
      >
        <label htmlFor="planType" className="text-xs font-bold">
          PLAN TYPE
        </label>
        <select
          id="planType"
          {...register("planType")}
          aria-invalid={Boolean(errors.title)}
        >
          {plans.map((elt) => (
            <option key={elt} value={elt} selected={elt === "Team"}>
              {elt}
            </option>
          ))}
        </select>

        <div className="flex items-center justify-between space-x-2">
          <div className="flex flex-grow flex-col space-y-2">
            <label htmlFor="vestingDuration" className="text-xs font-bold">
              VESTING DURATION
            </label>

            <select
              id="vestingDuration"
              {...register("vestingDuration")}
              aria-invalid={Boolean(errors.title)}
              disabled={type?.disabled}
            >
              {type?.duration.map((elt) => (
                <option key={elt} value={elt}>
                  {elt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-grow flex-col space-y-2">
            <label htmlFor="vestingCliff" className="text-xs font-bold">
              VESTING CLIFF
            </label>

            <select
              id="vestingCliff"
              {...register("vestingCliff")}
              aria-invalid={Boolean(errors.title)}
              disabled={type?.disabled}
            >
              {type?.cliff.map((elt) => (
                <option key={elt} value={elt}>
                  {elt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between space-x-2">
          <div className="flex flex-grow flex-col space-y-2">
            <label htmlFor="vestingSchedule" className="text-xs font-bold">
              VESTING SCHEDULE
            </label>

            <select
              id="vestingSchedule"
              {...register("vestingSchedule")}
              aria-invalid={Boolean(errors.title)}
              disabled={type?.disabled}
            >
              {type?.schedule.map((elt) => (
                <option key={elt} value={elt}>
                  {elt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-grow flex-col space-y-2">
            <label htmlFor="lockupDuration" className="text-xs font-bold">
              LOCKUP DURATION
            </label>

            <select
              id="lockupDuration"
              {...register("lockupDuration")}
              aria-invalid={Boolean(errors.title)}
              disabled={type?.disabled}
            >
              {type?.lockup.map((elt) => (
                <option key={elt} value={elt}>
                  {elt}
                </option>
              ))}
            </select>
          </div>
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
        <input id="startDate" type="date" {...register("startDate")} />
        {errors.startDate?.message && (
          <span className="text-xs text-red">
            {errors.startDate.message.toString()}
          </span>
        )}

        <label htmlFor="address" className="text-xs font-bold">
          ADDRESS
        </label>
        <input id="address" {...register("address")} />
        {errors.address?.message && (
          <span className="text-xs text-red">
            {errors.address.message.toString()}
          </span>
        )}

        <label
          htmlFor="accountName"
          className="v flex justify-between text-xs font-bold"
        >
          ACCOUNT NAME
        </label>
        <input id="accountName" {...register("accountName")} />
        {errors.accountName?.message && (
          <span className="text-xs text-red">
            {errors.accountName.message.toString()}
          </span>
        )}

        <label htmlFor="amount" className="flex justify-between text-xs ">
          <span className="font-bold">AMOUNT</span>
          <span>Available: {formatNumber(dummyProps.available)} EVMOS</span>
        </label>
        <input
          type="number"
          id="amount"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount?.message && (
          <span className="text-xs text-red">
            {errors.amount.message.toString()}
          </span>
        )}

        <input
          type="submit"
          style={{ backgroundColor: "#ed4e33" }}
          className="w-full cursor-pointer rounded p-2 font-[GreyCliff] text-lg  font-bold uppercase text-pearl"
          value="Create"
        />
      </form>
    </div>
  );
};

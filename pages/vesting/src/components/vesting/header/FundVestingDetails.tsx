import {
  ErrorContainer,
  ErrorMessage,
  SelectMenu,
  WizardHelper,
} from "@evmosapps/ui-helpers";
import { Intervals, TimeWindow } from "../../../internal/helpers/types";
import { StoreType, normalizeToEvmos } from "@evmosapps/evmos-wallet";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Log, formatNumber } from "helpers";
import {
  DEFAULT_FORM_VALUES,
  PlansType,
  getEndDate,
  isEthereumAddressValid,
  isEvmosAddressValid,
  schema,
  vestingSettingsConfig,
} from "../helpers";
import { useSelector } from "react-redux";
import { VestingResponse } from "../../../internal/types";
import { BigNumber } from "@ethersproject/bignumber";

import { getVesting } from "../../../internal/fetch";
import { getEvmosBalance } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/fetch";
import { ethers } from "ethers";
import { useTranslation } from "@evmosapps/i18n/client";

export default function FundVestingDetails({
  onNext,
}: {
  onNext: (d: FieldValues) => void;
}) {
  const { t } = useTranslation("vesting");

  const [disabled, setDisabled] = useState(false);
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [vestingAddress, setVestingAddress] = useState("");
  const [vestingAddressError, setVestingAddressError] = useState(false);
  const [vestingAddressData, setVestingAddressData] =
    useState<VestingResponse | null>(null);
  const [funderBalance, setFunderBalance] = useState(BigNumber.from(0));
  const [fundAmount, setAmount] = useState("0");

  const handleOnClick = (d: FieldValues) => {
    return onNext(d);
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
  useEffect(() => {
    function fetchVestingData() {
      let _vestingAddress;

      try {
        if (vestingAddress.startsWith("0x")) {
          if (!isEthereumAddressValid(vestingAddress)) {
            return;
          }
          _vestingAddress = normalizeToEvmos(vestingAddress);
        } else if (vestingAddress.startsWith("evmos")) {
          if (!isEvmosAddressValid(vestingAddress)) {
            return;
          }
          _vestingAddress = vestingAddress;
        }
        getVesting(_vestingAddress)
          .then((data) => {
            if ("error" in data) {
              if (data.error === "Error while getting vesting account info") {
                setVestingAddressError(true);
                return;
              }
            }

            const vestingDataRes: VestingResponse = data as VestingResponse;
            setVestingAddressData(vestingDataRes);
          })
          .catch(() => {
            setVestingAddressError(true);
          });
      } catch (e) {
        Log().error(e);
      }
    }
    fetchVestingData();
  }, [vestingAddress]);

  useEffect(() => {
    getEvmosBalance(wallet.evmosAddressCosmosFormat)
      .then((response) => {
        if ("code" in response) {
          setFunderBalance(BigNumber.from(0));
        } else {
          setFunderBalance(
            BigNumber.from(
              response?.balance.amount ? response.balance.amount : 0
            )
          );
        }
      })
      .catch(() => {});
  }, [wallet.evmosAddressCosmosFormat]);

  useEffect(() => {
    const _amount = BigNumber.from(ethers.parseEther(fundAmount));
    if (_amount.gt(funderBalance)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [fundAmount, funderBalance]);

  return (
    <form
      onSubmit={handleSubmit((d) => {
        handleOnClick(d);
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
            vestingSettingsConfig[planType].duration[0]!
          );
          setValue("vestingCliff", vestingSettingsConfig[planType].cliff[0]!);
          setValue(
            "vestingSchedule",
            vestingSettingsConfig[planType].schedule[0]!
          );
          setValue(
            "lockupDuration",
            vestingSettingsConfig[planType].lockup[0]!
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
          tooltip={{
            description: t("vesting.fund.cliff.tooltip.description"),
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
          tooltip={{
            description: t("vesting.fund.lockup.tooltip.description"),
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
        <ErrorMessage>{errors.startDate.message.toString()}</ErrorMessage>
      )}

      <label htmlFor="address" className="text-xs font-bold">
        {t("vesting.fund.address.title")}
      </label>
      <input
        id="address"
        {...register("address")}
        onChange={(e) => setVestingAddress(e.target.value)}
        className="textBoxStyle"
      />

      <div className="max-w-[320px]">
        {errors.address?.message && (
          <ErrorMessage>{errors.address.message}</ErrorMessage>
        )}
        {vestingAddressError && (
          <ErrorContainer description={t("enable.error")} />
        )}

        {!vestingAddressError &&
          vestingAddressData?.account?.funder_address &&
          vestingAddressData?.account?.funder_address?.toLowerCase() !==
            wallet?.evmosAddressCosmosFormat?.toLocaleLowerCase() && (
            <ErrorContainer description={t("fund.create.error")} />
          )}

        {!vestingAddressError &&
          vestingAddressData &&
          vestingAddressData?.account?.base_vesting_account?.original_vesting
            ?.length > 0 && (
            <WizardHelper>
              <p>{t("fund.already.funded.warning")} </p>
            </WizardHelper>
          )}
      </div>

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
        <ErrorMessage>{errors.accountName.message}</ErrorMessage>
      )}

      <label htmlFor="amount" className="flex justify-between text-xs">
        <span className="font-bold">{t("vesting.fund.amount.title")}</span>
        <span>
          {t("vesting.fund.amount.description")}{" "}
          {formatNumber(ethers.formatEther(funderBalance.toString()))} EVMOS
        </span>
      </label>
      <input
        type="number"
        id="amount"
        {...register("amount", { valueAsNumber: true })}
        onChange={(e) => {
          e.target.value === "" ? setAmount("0") : setAmount(e.target.value);
        }}
        className="textBoxStyle"
      />
      {errors.amount?.message && (
        <ErrorMessage>{errors.amount.message}</ErrorMessage>
      )}

      <input
        type="submit"
        disabled={disabled || vestingAddressError}
        style={{ backgroundColor: "#ed4e33" }}
        className={`w-full cursor-pointer rounded p-2 font-body text-lg text-pearl ${
          disabled ? "opacity-40" : ""
        }`}
        value={t("vesting.fund.button.action.title")}
      />
    </form>
  );
}

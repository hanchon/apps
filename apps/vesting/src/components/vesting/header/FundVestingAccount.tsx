import { ModalTitle } from "ui-helpers";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import FundVestingDetails from "./FundVestingDetails";
import ApproveFunding from "./ApproveFunding";
import ExecuteFund from "./ExecuteFund";
import { FieldValues } from "react-hook-form";

export const FundVestingAccount = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();

  const [step, setStep] = useState("prepare");
  const [vestingDetails, setVestingDetails] = useState<FieldValues>({});

  function renderScreen() {
    if (step === "prepare") {
      return (
        <FundVestingDetails
          onNext={(d) => {
            setVestingDetails(d);
            setStep("approve");
          }}
        />
      );
    }
    if (step === "approve") {
      return (
        <ApproveFunding
          onNext={() => {
            setStep("fund");
          }}
        />
      );
    }
    if (step === "fund") {
      return (
        <ExecuteFund
          vestingAccount={vestingDetails.address as string}
          onClose={onClose}
        />
      );
    }
  }

  return (
    <div className="space-y-5">
      <ModalTitle title={t("vesting.fund.title")} />
      {renderScreen()}
    </div>
  );
};

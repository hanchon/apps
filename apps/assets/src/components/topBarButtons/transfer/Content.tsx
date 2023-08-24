// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CheckIcon, DownloadIcon, RightArrowIcon } from "icons";
import { useState } from "react";
import { DepositContainer } from "./DepositContainer";
import { Subtitle } from "ui-helpers";

const TRANSFER_TYPES = {
  DEPOSIT: "Deposit",
  SEND: "Send",
};

export const Content = () => {
  const [transferType, setTransferType] = useState(TRANSFER_TYPES.DEPOSIT);

  function renderScreen() {
    if (transferType === TRANSFER_TYPES.DEPOSIT) {
      return <DepositContainer />;
    }

    return <>{/* TODO: add logic for send */}</>;
  }

  return (
    <section className="space-y-3">
      <Subtitle>Transfer Type</Subtitle>
      {/* TODO: make it reusable. It is on onboard too. */}
      <div className="grid grid-cols-1 gap-4 text-sm font-bold md:grid-cols-2">
        <button
          onClick={() => setTransferType(TRANSFER_TYPES.DEPOSIT)}
          className={`flex items-center justify-center gap-1 rounded-md px-3 py-1.5 ${
            transferType === TRANSFER_TYPES.DEPOSIT
              ? "border-red border-2"
              : "border-strokeGrey border"
          }`}
        >
          <DownloadIcon /> {TRANSFER_TYPES.DEPOSIT}
          {transferType === TRANSFER_TYPES.DEPOSIT && (
            <div className="bg-red text-pearl flex h-5 w-5 items-center justify-center rounded-full">
              <CheckIcon width={"14px"} height={"14px"} color="#fff" />
            </div>
          )}
        </button>
        <button
          onClick={() => setTransferType(TRANSFER_TYPES.SEND)}
          className={`flex items-center justify-center gap-1 rounded-md px-3 py-1.5 ${
            transferType === TRANSFER_TYPES.SEND
              ? "border-red border-2"
              : "border-strokeGrey border"
          }`}
        >
          <RightArrowIcon /> {TRANSFER_TYPES.SEND}
          {transferType === TRANSFER_TYPES.SEND && (
            <div className="bg-red text-pearl flex h-5 w-5 items-center justify-center rounded-full">
              <CheckIcon width={"14px"} height={"14px"} color="#fff" />
            </div>
          )}
        </button>
      </div>
      <div className="pt-7">{renderScreen()}</div>
    </section>
  );
};

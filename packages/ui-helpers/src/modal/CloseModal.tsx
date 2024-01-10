// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { AlertIcon } from "@evmosapps/icons/AlertIcon";
import { PrimaryButton } from "../PrimaryButton";

type CloseModalProps = {
  handleAccept: () => void;
  handleReject: () => void;
  description: string;
  title: string;
};

export const CloseModal = ({
  handleAccept,
  handleReject,
  description,
  title,
}: CloseModalProps) => {
  return (
    <div className="flex max-w-[550px] px-4 pb-4 pr-2 pt-5 sm:p-6">
      <div className="items-start justify-start">
        <span
          role="img"
          aria-label="alert icon"
          className="border-pink bg-pink flex items-center justify-center rounded-full border p-2"
        >
          <AlertIcon
            width={24}
            height={24}
            color="#dc2626"
            className="relative -top-[1px]"
          />
        </span>
      </div>
      <div className="mx-5 mt-0 space-y-3">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          {title}
        </h3>

        <p>{description}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleAccept}
            className="color-gray300 border-gray300 rounded-lg border px-8 py-2 font-normal shadow transition-all duration-300 hover:shadow-md focus-visible:outline-none"
          >
            Stay
          </button>

          <PrimaryButton onClick={handleReject} className="w-auto px-8">
            <p>Exit</p>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

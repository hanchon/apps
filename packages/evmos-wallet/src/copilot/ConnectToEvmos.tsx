// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EvmosRedIcon } from "icons";

export const ConnectToEvmos = () => {
  return (
    <div className="space-y-3 px-4 pb-4 pt-5 sm:p-6">
      <EvmosRedIcon />
      <h3 className="text-[#271411] text-base font-semibold leading-6">
        Connect your account
      </h3>

      <p className="text-sm text-gray1">Get started with Evmos!</p>
      <p className="text-sm text-gray1">
        We recommend for first-time users to use
        <b> Evmos Copilot</b>.
      </p>
    </div>
  );
};

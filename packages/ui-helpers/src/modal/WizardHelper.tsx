// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EvmosCopilotIcon } from "icons";

export const WizardHelper = ({
  icon,
  children,
}: {
  icon?: JSX.Element;
  children: JSX.Element;
}) => {
  return (
    <section className="bg-lightBlue flex space-x-2 rounded-lg p-4">
      {/* by default we show the wizard icon */}
      {icon ? icon : <EvmosCopilotIcon height={30} />}
      <div className="relative text-blue text-sm cursor-default flex items-center">
        {children}
      </div>
    </section>
  );
};

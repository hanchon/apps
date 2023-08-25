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
    <section className="bg-lightBlue flex space-x-2 justify-start rounded-lg p-4">
      {/* by default we show the wizard icon */}
      {icon ? icon : <EvmosCopilotIcon width={100} />}
      <div className="relative -top-[3px] text-blue text-sm cursor-default">
        {children}
      </div>
    </section>
  );
};

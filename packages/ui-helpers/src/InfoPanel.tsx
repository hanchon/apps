// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EvmosCopilotIcon } from "icons";
import cx from "clsx";

export const InfoPanel = ({
  icon,
  children,
  variant = "default",
}: {
  icon?: JSX.Element;
  children: JSX.Element;
  variant?: "info" | "default";
}) => {
  return (
    <section
      className={cx(
        "flex space-x-6 justify-start rounded-lg py-8 px-8 text-xxs md:text-xs font-bold leading-5 mb-8",
        {
          "border border-pink-300 text-purple-200": variant === "default",
          "bg-lightBlue text-blue": variant === "info",
        }
      )}
    >
      {/* by default we show the wizard icon */}
      {icon ? icon : <EvmosCopilotIcon width={100} />}
      <div className="relative -top-[3px] cursor-default">{children}</div>
    </section>
  );
};

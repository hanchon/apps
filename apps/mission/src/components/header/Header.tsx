import { translation } from "@evmosapps/i18n/server";
import { Branding } from "./Branding";
import { EvmosPrice } from "./TokenPrice";
import { LaunchPad } from "./LaunchPad";

import { ConnectModalButton } from "./ConnectModalButton";

export const Header = async () => {
  const { t } = await translation();

  return (
    <div className="mx-auto container xl:max-w-full px-4 flex flex-col text-pearl md:flex-row md:items-center md:justify-between my-5 md:my-8 items-center gap-y-6">
      <Branding />
      <div className="flex items-center space-x-3 text-xs sm:text-base leading-none">
        <EvmosPrice />
        <LaunchPad />
        <ConnectModalButton />
      </div>
    </div>
  );
};

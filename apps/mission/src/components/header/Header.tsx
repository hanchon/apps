import { CalculatorIcon, CoinIcon, GovernanceIcon, NutIcon } from "icons";
import { translation } from "@evmosapps/i18n/server";
import { Branding } from "./Branding";
import { NetworkModeSelector } from "ui-helpers";
import { EvmosPrice } from "./TokenPrice";
import { LaunchContainer } from "ui-helpers/src/launchPad/Container";
import { LaunchPad, LaunchPadItem } from "./LaunchPad";
import { ConnectModal } from "../modals/ConnectModal/ConnectModal";
import { ConnectModalButton } from "./ConnectModalButton";
import { SetUpContainer } from "copilot/src/copilot/dapp/SteUpContainer";

export const Header = async () => {
  const { t } = await translation();

  return (
    <div className="mt-5 md:mt-0 text-pearl mb-3 flex flex-col md:mx-0 md:h-32 md:flex-row md:items-center md:justify-between">
      <Branding />
      {!!process.env.NEXT_PUBLIC_ENABLE_TESTNET && <NetworkModeSelector />}
      <div className="flex items-center justify-center md:space-x-16">
        <EvmosPrice />

        <div className="flex items-center space-x-3">
          <LaunchPad />

          <ConnectModalButton />
        </div>
      </div>
    </div>
  );
};

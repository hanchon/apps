import { Branding } from "./Branding";
import { LaunchPad } from "./LaunchPad";

import { Container } from "@evmosapps/ui-helpers";
import { EvmosPrice } from "./evmos-price/EvmosPrice";
import { WalletButton } from "./WalletButton";

export const Header = () => {
  return (
    <Container
      full
      className="flex flex-col text-pearl md:flex-row md:items-center md:justify-between my-5 md:my-11 items-center gap-y-6 px-0 sm:px-5 xl:px-14"
    >
      <Branding />
      <div className="flex justify-stretch items-stretch space-x-3 text-xs sm:text-base leading-none">
        <EvmosPrice />

        <LaunchPad />
        <WalletButton />
      </div>
    </Container>
  );
};

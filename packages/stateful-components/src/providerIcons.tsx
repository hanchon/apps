"use client";
import { KeplrIcon } from "@evmosapps/icons/KeplrIcon";
import { MetamaskIcon } from "@evmosapps/icons/MetamaskIcon";
import { WalletConnectIcon } from "@evmosapps/icons/WalletConnectIcon";

export const ProvidersIcons: Record<
  string,
  React.FC<React.SVGAttributes<SVGElement>>
> = {
  MetaMask: MetamaskIcon,
  Keplr: KeplrIcon,
  WalletConnect: WalletConnectIcon,
};

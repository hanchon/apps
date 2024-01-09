"use client";
import { KeplrIcon, MetamaskIcon, WalletConnectIcon } from "icons";

export const ProvidersIcons: Record<
  string,
  React.FC<React.SVGAttributes<SVGElement>>
> = {
  MetaMask: MetamaskIcon,
  Keplr: KeplrIcon,
  WalletConnect: WalletConnectIcon,
};

import { NutIcon, CoinIcon, CalculatorIcon, GovernanceIcon } from "icons";

export type LaunchPadItemsProps = {
  icon: JSX.Element;
  text: string;
  href: string;
};

export const launchPadItems = [
  { icon: <NutIcon width="40" height="40" />, text: "Home", href: "/" },
  {
    icon: <CoinIcon width="40" height="40" />,
    text: "Assets",
    href: "/assets",
  },
  {
    icon: <CalculatorIcon width="40" height="40" />,
    text: "Staking",
    href: "/staking",
  },
  {
    icon: <GovernanceIcon width="40" height="40" />,
    text: "Governance",
    href: "/governance",
  },
];

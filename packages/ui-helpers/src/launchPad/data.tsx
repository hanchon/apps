import { NutIcon, CoinIcon, CalculatorIcon, GovernanceIcon } from "icons";

export type LaunchPadItemsProps = {
  icon: JSX.Element;
  text: string;
  href: string;
};

const localPorts = {
  "/": 3004,
  "/assets": 3002,
  "/staking": 3003,
  "/governance": 3001,
  "/vesting": 3005,
} as const;

const getHref = (path: keyof typeof localPorts) => {
  if (process.env.NODE_ENV !== "development") return path;
  return `http://localhost:${localPorts[path]}${path}`;
};

export const launchPadItems = [
  {
    icon: <NutIcon width="40" height="40" />,
    text: "launchPad.dApp.title",
    href: getHref("/"),
  },
  {
    icon: <CoinIcon width="40" height="40" />,
    text: "launchPad.assets.title",
    href: getHref("/assets"),
  },
  {
    icon: <CalculatorIcon width="40" height="40" />,
    text: "launchPad.staking.title",
    href: getHref("/staking"),
  },
  {
    icon: <GovernanceIcon width="40" height="40" />,
    text: "launchPad.governance.title",
    href: getHref("/governance"),
  },
];

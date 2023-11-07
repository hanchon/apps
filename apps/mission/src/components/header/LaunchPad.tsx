"use client";
import { Link, useTranslation } from "@evmosapps/i18n/client";
import { Menu, Transition } from "@headlessui/react";
import { ECOSYSTEM_URL } from "constants-helper";
import {
  CalculatorIcon,
  CoinIcon,
  GovernanceIcon,
  LaunchIcon,
  NutIcon,
} from "icons";
import { ComponentProps, Fragment, PropsWithChildren } from "react";
import { CLICK_ON_DAPP_INSIDE_LAUNCHER, useTracker } from "tracker";
import { Badge } from "ui-helpers";
import { PingIndicator } from "ui-helpers/src/PingIndicator";
import { usePingIndicator } from "ui-helpers/src/launchPad/usePingIndicator";

const localPorts = {
  "/": 3004,
  "/portfolio": 3002,
  "/staking": 3003,
  "/governance": 3001,
  "/vesting": 3005,
} as const;

const getHref = (path: keyof typeof localPorts) => {
  if (process.env.NODE_ENV !== "development") return path;
  return `http://localhost:${localPorts[path]}${path}`;
};

export function LaunchPad({}: { showPing?: boolean }) {
  const { t } = useTranslation();
  const { sendEvent } = useTracker();
  const { showPing, handlePingIndicator } = usePingIndicator();

  const launchPadItems = [
    {
      icon: <NutIcon width="40" height="40" />,
      children: t("launchPad.dApp.title"),
      href: getHref("/"),
      mixpanelId: "dAppStore",
    },
    {
      icon: <CoinIcon width="40" height="40" />,
      children: t("launchPad.assets.title"),
      href: getHref("/portfolio"),
      mixpanelId: "Assets",
    },
    {
      icon: <CalculatorIcon width="40" height="40" />,
      children: t("launchPad.staking.title"),
      href: getHref("/staking"),
      mixpanelId: "Staking",
    },
    {
      icon: <GovernanceIcon width="40" height="40" />,
      children: t("launchPad.governance.title"),
      href: getHref("/governance"),
      mixpanelId: "Governance",
    },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <PingIndicator showPing={showPing}>
        <Menu.Button
          aria-label="launchpad"
          className="flex items-center justify-center rounded-full p-2"
          onClick={handlePingIndicator}
        >
          <LaunchIcon
            width={40}
            height={40}
            className="transtion-all bg-darkGray700 rounded-full duration-200 ease-in-out hover:bg-[#534d46] active:bg-[#666059]"
          />
        </Menu.Button>
      </PingIndicator>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" absolute z-10 mt-2 w-64 origin-top-right rounded-md bg-[#262017] pt-8 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:right-0 md:w-96">
          {showPing && (
            <div className="bg-darkGray700 mx-8 mb-8 cursor-default space-y-1 rounded-lg p-5">
              <div className="flex items-center justify-between">
                <h1 className="text-xs font-bold">{t("launchPad.title")}</h1>
                <Badge variant="danger" className="uppercase">
                  {t("launchPad.badge.text")}
                </Badge>
              </div>
              <p className="text-xs text-[#BDBCB9]">
                {t("launchPad.description")}
              </p>
            </div>
          )}
          <div className="grid grid-cols-3 gap-y-10 px-8 pb-8">
            {launchPadItems.map(({ href, ...rest }) => (
              <LaunchPadItem
                key={href}
                href={href}
                onClick={() => {
                  sendEvent(CLICK_ON_DAPP_INSIDE_LAUNCHER, {
                    dApp: rest.mixpanelId,
                  });
                }}
                {...rest}
              />
            ))}
          </div>
          <a
            onClick={() => {
              sendEvent(CLICK_ON_DAPP_INSIDE_LAUNCHER, {
                OtherActions: "View all dApps",
              });
            }}
            href={ECOSYSTEM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-t-darkGray700 text-pearl bg-darkGray2Opacity active:bg-darkGray700 flex justify-center border-t py-5 transition-all duration-200 ease-in-out hover:bg-[#FFFFFF0F]"
          >
            {t("launchPad.button")}
          </a>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export const LaunchPadItem = ({
  icon,
  children,
  ...rest
}: ComponentProps<"a"> & {
  icon: JSX.Element;
}) => {
  return (
    <a
      rel="noopener noreferrer"
      className="text-pearl flex flex-col items-center text-center"
      {...rest}
    >
      <div className="bg-red hover:bg-red1 active:bg-red2 flex w-fit items-center justify-center rounded-lg p-2 transition-all duration-150 ease-in hover:scale-105">
        {icon}
      </div>
      <p>{children}</p>
    </a>
  );
};

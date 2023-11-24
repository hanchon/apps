"use client";
import { Link, useTranslation } from "@evmosapps/i18n/client";
import { Menu, Transition } from "@headlessui/react";
import { cn } from "helpers";
import {
  CalculatorIcon,
  CoinIcon,
  GovernanceIcon,
  LaunchIcon,
  NutIcon,
} from "icons";
import { ComponentProps, Fragment } from "react";
import { CLICK_ON_DAPP_INSIDE_LAUNCHER, useTracker } from "tracker";
import { NetworkModeSelector } from "@evmosapps/ui-helpers";

export function LaunchPad({}: { showPing?: boolean }) {
  const { t } = useTranslation();
  const { sendEvent } = useTracker();

  const launchPadItems = [
    {
      icon: <NutIcon width="40" height="40" />,
      children: t("launchPad.dApp.title"),
      href: "/",
      mixpanelId: "dAppStore",
    },
    {
      icon: <CoinIcon width="40" height="40" />,
      children: t("launchPad.assets.title"),
      href: "/portfolio",
      mixpanelId: "Assets",
    },
    {
      icon: <CalculatorIcon width="40" height="40" />,
      children: t("launchPad.staking.title"),
      href: "/staking",
      mixpanelId: "Staking",
    },
    {
      icon: <GovernanceIcon width="40" height="40" />,
      children: t("launchPad.governance.title"),
      href: "/governance",
      mixpanelId: "Governance",
    },
  ];

  return (
    <Menu as="div" className="sm:relative flex">
      <Menu.Button
        aria-label="launchpad"
        className="transtion-all bg-darkGray700 rounded-full duration-200 ease-in-out hover:bg-[#534d46] active:bg-[#666059]"
      >
        <LaunchIcon width={30} height={30} />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={cn(
            "fixed md:absolute w-full top-6 left-0 md:right-0 md:left-auto z-10 mt-2 md:w-96 origin-top-right rounded-md bg-[#262017] pt-8 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none "
          )}
        >
          <div className="grid grid-cols-3 gap-y-10 px-8 pb-8">
            {launchPadItems.map(({ href, mixpanelId, ...rest }) => (
              <LaunchPadItem
                key={href}
                href={href}
                onClick={() => {
                  sendEvent(CLICK_ON_DAPP_INSIDE_LAUNCHER, {
                    dApp: mixpanelId,
                  });
                }}
                {...rest}
              />
            ))}
          </div>
          {!!process.env.NEXT_PUBLIC_ENABLE_TESTNET && <NetworkModeSelector />}

          <a
            onClick={() => {
              sendEvent(CLICK_ON_DAPP_INSIDE_LAUNCHER, {
                OtherActions: "View all dApps",
              });
            }}
            href="/dapps"
            rel="noopener noreferrer"
            className="border-t-darkGray700 text-sm text-pearl bg-darkGray2Opacity active:bg-darkGray700 flex justify-center border-t py-5 transition-all duration-200 ease-in-out hover:bg-[#FFFFFF0F]"
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
}: ComponentProps<typeof Link> & {
  icon: JSX.Element;
}) => {
  return (
    <Link
      rel="noopener noreferrer"
      className="text-pearl text-sm flex flex-col items-center text-center space-y-2"
      {...rest}
    >
      <div className="bg-red-300 hover:bg-red1 active:bg-red2 flex w-fit items-center justify-center rounded-lg p-2 transition-all duration-150 ease-in hover:scale-105">
        {icon}
      </div>
      <p>{children}</p>
    </Link>
  );
};

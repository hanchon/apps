"use client";
import { Link, useTranslation } from "@evmosapps/i18n/client";
import { Menu, Transition } from "@headlessui/react";
import { cn } from "helpers";
import { LaunchIcon } from "icons";
import { ComponentProps, Fragment } from "react";
import { CLICK_ON_DAPP_INSIDE_LAUNCHER, useTracker } from "tracker";
import { ButtonWithLink, NetworkModeSelector } from "@evmosapps/ui-helpers";
import Image from "next/image";

export function LaunchPad({}: { showPing?: boolean }) {
  const { t } = useTranslation();
  const { sendEvent } = useTracker();

  const launchPadItems = [
    {
      icon: "/ecosystem/home.png",
      children: t("launchPad.dApp.title"),
      href: "/",
      mixpanelId: "dAppStore",
    },
    {
      icon: "/ecosystem/portfolio.png",
      children: t("launchPad.assets.title"),
      href: "/portfolio",
      mixpanelId: "Assets",
    },
    {
      icon: "/ecosystem/staking.png",
      children: t("launchPad.staking.title"),
      href: "/staking",
      mixpanelId: "Staking",
    },
    {
      icon: "/ecosystem/governance.png",
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
        <LaunchIcon width={40} height={40} />
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
            " fixed shadow-custom md:absolute w-full px-8 top-32 md:top-9 left-0 md:right-0 md:left-auto z-10 mt-2 md:w-96 origin-top-right rounded-md bg-[#262017] py-8 drop-shadow-md drop-shadow-red1 border border-darkGray700 "
          )}
        >
          <div className="w-fit">
            {launchPadItems[0] && (
              <LaunchPadItem
                key={launchPadItems[0].href}
                href={launchPadItems[0].href}
                onClick={() => {
                  sendEvent(CLICK_ON_DAPP_INSIDE_LAUNCHER, {
                    dApp: launchPadItems[0]?.mixpanelId,
                  });
                }}
                icon={launchPadItems[0].icon}
              >
                {launchPadItems[0].children}
              </LaunchPadItem>
            )}
          </div>
          <div className="grid grid-cols-3 gap-y-6  py-6">
            {launchPadItems.slice(1).map(({ href, mixpanelId, ...rest }) => (
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
          <ButtonWithLink
            href="/dapps"
            className="w-full mt-2"
            onClick={() => {
              sendEvent(CLICK_ON_DAPP_INSIDE_LAUNCHER, {
                OtherActions: "View all dApps",
              });
            }}
          >
            {t("launchPad.button")}
          </ButtonWithLink>
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
  icon: string;
}) => {
  return (
    <Link
      rel="noopener noreferrer"
      className="text-pearl text-sm  flex flex-col space-y-2 h-[100px]"
      {...rest}
    >
      <Image
        src={icon}
        width={100}
        height={100}
        alt={icon}
        className="transition-all duration-150 ease-in hover:scale-105"
      />
      <p className="text-center">{children}</p>
    </Link>
  );
};

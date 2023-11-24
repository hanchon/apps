"use client";
import { CLICK_CONNECT_WALLET_BUTTON, useTracker } from "tracker";
import { AddressDisplay, PrimaryButton } from "@evmosapps/ui-helpers";
import { cn } from "helpers";
import {
  getActiveProviderKey,
  normalizeToEvmos,
} from "@evmosapps/evmos-wallet";
import { useAccount } from "wagmi";
import { ConnectModalTrigger } from "stateful-components/src/modals/ConnectModal/ConnectModal";
import { ProfileModalTrigger } from "stateful-components/src/modals/ProfileModal/ProfileModal";
import { ProvidersIcons } from "stateful-components/src/providerIcons";

export const WalletButton = () => {
  const { isConnected, connector, address } = useAccount();

  const { sendEvent } = useTracker();

  if (connector && isConnected && address) {
    const Icon = ProvidersIcons[connector.id];
    return (
      <ProfileModalTrigger>
        <button
          className="text-xs text-pearl bg-darGray800 flex items-center justify-center space-x-3 rounded-full px-4 md:px-8 py-2 font-bold"
          data-testid={`wallet-profile-button wallet-profile-button-${getActiveProviderKey()}`}
        >
          {Icon && <Icon width="1.4em" height="1.4em" />}

          <span className="font-bold whitespace-nowrap">
            <AddressDisplay address={normalizeToEvmos(address)} />
          </span>
        </button>
      </ProfileModalTrigger>
    );
  }
  return (
    <ConnectModalTrigger>
      <PrimaryButton
        variant={"primary"}
        onClick={() => {
          const query = new URLSearchParams(window.location.search);
          const modalAction = query?.get("action");
          let location = "dApp Store";
          if (modalAction) {
            if (modalAction === "transfer") {
              location = "send modal";
            } else if (modalAction === "pay") {
              location = "payment request modal";
            } else {
              location = "receive modal";
            }
          }
          sendEvent(CLICK_CONNECT_WALLET_BUTTON, {
            location,
          });
        }}
        data-testid="open-connect-modal"
        className={cn("rounded-full px-8 py-1.5 font-bold")}
      >
        Connect
      </PrimaryButton>
    </ConnectModalTrigger>
  );
};

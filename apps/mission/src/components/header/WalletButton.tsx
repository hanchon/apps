"use client";
import { CLICK_CONNECT_WALLET_BUTTON } from "tracker";
import {
  AddressDisplay,
  PrimaryButton,
  TrackerEvent,
} from "@evmosapps/ui-helpers";
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

  if (connector && isConnected && address) {
    const Icon = ProvidersIcons[connector.id];
    return (
      <ProfileModalTrigger>
        <button
          className="text-pearl bg-darGray800 flex items-center justify-center space-x-3 rounded-full px-4 md:px-8 py-2 font-bold"
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
      <TrackerEvent event={CLICK_CONNECT_WALLET_BUTTON}>
        <PrimaryButton
          variant={"primary"}
          data-testid="open-connect-modal"
          className={cn("rounded-full px-8 py-2 text-sm font-bold")}
        >
          Connect
        </PrimaryButton>
      </TrackerEvent>
    </ConnectModalTrigger>
  );
};

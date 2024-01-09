"use client";
import { AddressDisplay } from "@evmosapps/ui-helpers";
import {
  getActiveProviderKey,
  normalizeToEvmos,
} from "@evmosapps/evmos-wallet";
import { useAccount } from "wagmi";
import { ProfileModalTrigger } from "stateful-components/src/modals/ProfileModal/ProfileModal";
import { ProvidersIcons } from "stateful-components/src/providerIcons";
import { ConnectButton } from "stateful-components/src/connect-button";

// import { getAccount } from "wagmi/actions";

export const WalletButton = () => {
  const { isConnected, connector, address } = useAccount();

  if (connector && isConnected && address) {
    const Icon = ProvidersIcons[connector.name];
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
  return <ConnectButton />;
};

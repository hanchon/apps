// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps, useEffect } from "react";

import { EvmosCopilotIcon } from "icons";
import {
  CLICK_CONNECTED_WITH,
  CLICK_EVMOS_COPILOT_START_FLOW,
  SUCCESSFUL_WALLET_CONNECTION,
  UNSUCCESSFUL_WALLET_CONNECTION,
  useTracker,
} from "tracker";

import { E, cn } from "helpers";

import { Badge, Divider } from "@evmosapps/ui-helpers";
import { useAccount, useConnect } from "wagmi";

import {
  WALLET_NOTIFICATIONS,
  notifyError,
} from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/errors";
import { useSetupCopilotModal } from "../SetupAccountModal/SetupAccountModal";
import { ProvidersIcons } from "../../providerIcons";

export const ButtonWallet = ({
  className,
  disabled,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        className,
        "flex w-full px-4 py-3",
        "hover:bg-grayOpacity hover:shadow-md",
        "border-darkPearl shadow rounded border",
        "capitalize items-center space-x-3 text-sm font-bold",
        "transition-all duration-300",
        {
          disabled: disabled,
        }
      )}
      {...props}
    />
  );
};
export const ConnectModalContent = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { sendEvent } = useTracker();
  const { connectors, connect } = useConnect({
    mutation: {
      onSuccess: (_, { connector }) => {
        sendEvent(SUCCESSFUL_WALLET_CONNECTION, {
          "Wallet Provider": connector.name,
        });
        setIsOpen(false);
      },

      onError: (e, { connector }) => {
        sendEvent(UNSUCCESSFUL_WALLET_CONNECTION, {
          "Wallet Provider": connector.name,
          "Error Message": `Failed to connect with ${connector.name}`,
        });
        if (E.match.byPattern(e, /Connector not found/)) {
          notifyError(
            "{walletName} not found",
            WALLET_NOTIFICATIONS.ExtensionNotFoundSubtext,
            {
              walletName: connector.name,
            }
          );
          return;
        }
        if (
          E.match.byCode(e, -32002) || // metamask
          E.match.byMessage(e, "PROVIDER_NOT_AVAILABLE") // keplr
        ) {
          notifyError(
            "{walletName} not found",
            WALLET_NOTIFICATIONS.AddressSubtext,
            {
              walletName: connector.name,
            }
          );
          return;
        }
        if (
          E.match.byCode(e, 4001) ||
          E.match.byPattern(e, /Connection request reset/) || // wallet connect
          E.match.byPattern(e, /Request rejected/) // keplr
        ) {
          notifyError(
            WALLET_NOTIFICATIONS.ErrorTitle,
            "The connection was rejected",
            {
              walletName: connector.name,
            }
          );
          return;
        }
        // Didn't find a match, so we'll just isOpen the error
        notifyError(WALLET_NOTIFICATIONS.ErrorTitle, "", {
          walletName: connector.name,
        });
      },
    },
  });

  const copilot = useSetupCopilotModal();

  const { isConnected } = useAccount();
  useEffect(() => {
    if (isConnected) {
      setIsOpen(false);
    }
  }, [isConnected, setIsOpen]);
  return (
    <div className="space-y-3">
      <>
        <div className="md:mt-5">
          <ButtonWallet
            data-testid="connect-with-evmos-copilot"
            className="text-left flex"
            onClick={() => {
              copilot.setIsOpen(true);
              sendEvent(CLICK_EVMOS_COPILOT_START_FLOW);
            }}
          >
            <EvmosCopilotIcon className="h-9 w-auto" />
            <div className="flex flex-col text-sm grow">
              <p className="">Evmos Copilot</p>
              <p className="font-normal">Recommended for first time users</p>
            </div>

            <Badge variant="success">New</Badge>
          </ButtonWallet>
        </div>
        <Divider>or</Divider>
      </>
      <div className="flex flex-col space-y-3">
        {connectors
          .filter((connector) => {
            if (connector.id === "io.metamask") return false;
            if (connector.name === "Safe") return false;
            return true;
          })
          .map((connector) => {
            const Icon = ProvidersIcons[connector.name];

            return (
              <ButtonWallet
                key={connector.uid}
                data-testid={`connect-with-${connector.name}`}
                onClick={() => {
                  sendEvent(CLICK_CONNECTED_WITH, {
                    "Wallet Provider": connector.name,
                  });
                  connect({
                    connector,
                  });
                }}
              >
                {Icon && <Icon className="w-7" />}
                <span>{connector.name}</span>
              </ButtonWallet>
            );
          })}
      </div>
    </div>
  );
};

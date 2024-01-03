import { PrimaryButton } from "@evmosapps/ui-helpers";
import { ConnectModalTrigger } from "./modals/ConnectModal/ConnectModal";
import { cn } from "helpers";
import { CLICK_CONNECT_WALLET_BUTTON, sendEvent } from "tracker";

export const ConnectButton = () => {
  return (
    <ConnectModalTrigger>
      <PrimaryButton
        variant={"primary"}
        data-testid="open-connect-modal"
        className={cn("rounded-full px-8 py-2 text-sm font-bold")}
        onClick={() => {
          sendEvent(CLICK_CONNECT_WALLET_BUTTON);
        }}
      >
        Connect
      </PrimaryButton>
    </ConnectModalTrigger>
  );
};

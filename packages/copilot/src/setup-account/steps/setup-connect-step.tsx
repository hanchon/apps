import { useTranslation } from "@evmosapps/i18n/client";
import { Trans } from "react-i18next";
import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";
import { SetupWithMetamaskSteps } from "../partials/setup-with-metamask";
import { useCopilot } from "../../copilot";
import { Modal } from "@evmosapps/ui-helpers";
import { SUCCESSFUL_WALLET_CONNECTION_COPILOT, sendEvent } from "tracker";
import { useAccount } from "wagmi";
import { getActiveProviderKey } from "@evmosapps/evmos-wallet";

export const evmosInfo = getEvmosChainInfo();

export const SetupConnectStep = () => {
  const { t } = useTranslation("copilot-setup-account");

  const { nextStep } = useCopilot();
  const { address } = useAccount();
  const activeProviderKey = getActiveProviderKey();

  return (
    <section className="flex flex-col gap-y-4">
      <Modal.Header>
        <h1 className="font-bold text-base">{t("connectStep.title")}</h1>
      </Modal.Header>
      <p className="text-gray1 text-sm mb-10 [&>br]:leading-9 [&>br]:mt-4 [&>br]:block [&>br]:content-['_']">
        <Trans t={t} i18nKey="connectStep.body" />
      </p>
      <SetupWithMetamaskSteps
        onComplete={() => {
          nextStep();
          sendEvent(SUCCESSFUL_WALLET_CONNECTION_COPILOT, {
            "User Wallet Address": address,
            "Wallet Provider": activeProviderKey,
          });
        }}
      />
    </section>
  );
};

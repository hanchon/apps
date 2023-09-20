// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, SetStateAction } from "react";
import { ConnectToEvmos } from "./ConnectToEvmos";
import { ConnectToEvmosWallets } from "./ConnectToEvmosWallets";
import { ModalContainer, ModalWithTransitions } from "ui-helpers";
import { useConnect } from "wagmi";

export const WalletConnectModal = ({
  show,
  setShow,
  copilotModal,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  copilotModal?: JSX.Element;
}) => {
  const { connectors } = useConnect();
  const connectorIds = connectors.map((c) => c.id);
  const contentModal = (
    <ModalContainer
      introduction={<ConnectToEvmos />}
      content={
        <ConnectToEvmosWallets
          copilotModal={copilotModal}
          setShow={setShow}
          connectorIds={connectorIds}
        />
      }
    />
  );

  return (
    <ModalWithTransitions show={show} setShow={setShow} propClose={true}>
      {contentModal}
    </ModalWithTransitions>
  );
};

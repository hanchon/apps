// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import { useEffect, useMemo, useState } from "react";
import {
  ErrorMessage,
  Label,
  Modal,
  PrimaryButton,
  Subtitle,
  Tabs,
  TextInput,
  Title,
} from "@evmosapps/ui-helpers";
import { Trans } from "next-i18next";

import { CryptoSelector } from "@evmosapps/ui-helpers";
import QRCode from "react-qr-code";

import { getActiveProviderKey, getChain } from "@evmosapps/evmos-wallet";
import { ReceiveIcon } from "@evmosapps/icons/ReceiveIcon";
import { ShareIcon } from "@evmosapps/icons/ShareIcon";
import { CryptoSelectorDropdownBox } from "@evmosapps/ui-helpers";
import { CryptoSelectorTitle } from "@evmosapps/ui-helpers";

import { RequestModalProps } from "./RequestModal";
import {
  CLICK_ON_COPY_ICON_RECEIVE_FLOW,
  CLICK_ON_DISPLAY_FORMAT,
  CLICK_ON_REQUEST_FUNDS,
  CLICK_ON_SHARE_QR_CODE,
  SELECT_NETWORK_RECEIVE_FLOW,
  useTracker,
} from "tracker";

import { useAccount } from "wagmi";
import { sortedChains } from "../shared/sortedChains";
import { useTranslation } from "@evmosapps/i18n/client";
import { ConnectToWalletWarning } from "../shared/ConnectToWalletWarning";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";

export const ReceiveContent = ({
  setState,
}: {
  setState: RequestModalProps["setState"];
}) => {
  const { t } = useTranslation("portfolio");
  const { sendEvent } = useTracker();
  const [walletFormat, setWalletFormat] = useState("0x");

  const { address } = useAccount();
  const [selectedNetworkPrefix, setSelectedNetworkPrefix] = useState("evmos");
  const selectedChain = getChain(selectedNetworkPrefix);

  const sender = address
    ? walletFormat === "0x"
      ? address
      : normalizeToCosmos(address)
    : undefined;

  const shareEnabled = navigator.share !== undefined;

  const activeProviderKey = getActiveProviderKey();
  const networkOptions = useMemo(() => {
    if (activeProviderKey === "MetaMask") {
      return ["evmos"];
    }
    return sortedChains;
  }, [activeProviderKey]);

  useEffect(() => {
    if (selectedNetworkPrefix !== "evmos") {
      setWalletFormat("IBC");
    }
  }, [selectedNetworkPrefix]);

  const addressProps = [
    {
      onClick: () => {
        {
          setWalletFormat("0x");
          sendEvent(CLICK_ON_DISPLAY_FORMAT, {
            "Receive Modal Actions": "0x",
            "Wallet Provider": activeProviderKey,
          });
        }
      },
      type: "0x",
      option: walletFormat,
      text: "0x",
      disabled:
        selectedChain.prefix !== "evmos" && selectedChain.prefix !== "kava",
    },
    {
      onClick: () => {
        setWalletFormat("IBC");
        sendEvent(CLICK_ON_DISPLAY_FORMAT, {
          "Receive Modal Actions": "IBC",
          "Wallet Provider": activeProviderKey,
        });
      },
      type: "IBC",
      option: walletFormat,
      text: "IBC",
    },
  ];

  const [showCopied, setIsOpenCopied] = useState(false);

  const { isDisconnected } = useAccount();

  return (
    <section className="space-y-16 text-pearl">
      <Modal.Header>
        <Title
          variant="modal-black"
          icon={<ReceiveIcon className="text-pink-300" />}
        >
          {t("receive.title")}
        </Title>
      </Modal.Header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <section className="space-y-8">
          <div className="flex flex-col gap-6">
            <div className="flex gap-2 mb-6 flex-col">
              <div className="bg-white p-2 w-[200px] h-[200px] rounded-xl self-center">
                <QRCode
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={sender ?? ""}
                />
              </div>
              {shareEnabled && (
                <button
                  onClick={() => {
                    void navigator.share({
                      text: sender ?? "",
                      title: "Wallet Address",
                    });
                    sendEvent(CLICK_ON_SHARE_QR_CODE, {
                      "Receive Modal Actions": "<Share Recipient Address",
                      "Wallet Provider": activeProviderKey,
                    });
                  }}
                  className="flex items-center space-x-2 self-center"
                >
                  <span className="text-pink-300 text-xxs md:text-xs">
                    {t("receive.share.qr")}
                  </span>
                  <ShareIcon className="w-3 h-4 md:w-5 md:h-4 relative -top-[1px]" />
                </button>
              )}
            </div>

            <div className="flex justify-between flex-row items-end">
              <div className="space-y-1">
                <Label> {t("receive.format.label")}</Label>
                <Tabs tabsProps={addressProps} variant="pink-small" />
              </div>
              <div className="flex justify-between">
                <CryptoSelectorDropdownBox>
                  <CryptoSelectorTitle>
                    {t("transfer.section.asset.network")}
                  </CryptoSelectorTitle>
                  <CryptoSelector
                    value={selectedNetworkPrefix}
                    onChange={(prefix) => {
                      setSelectedNetworkPrefix(prefix);
                      sendEvent(SELECT_NETWORK_RECEIVE_FLOW, {
                        "Wallet Provider": activeProviderKey,
                        Network: prefix,
                      });
                    }}
                  >
                    <CryptoSelector.Button
                      src={`/chain/${selectedNetworkPrefix}.png`}
                    >
                      {selectedChain.name}
                    </CryptoSelector.Button>
                    <CryptoSelector.Options
                      label={t("transfer.section.network.label")}
                      className="right-0"
                    >
                      {networkOptions.map((value) => {
                        const chain = getChain(value);
                        return (
                          <CryptoSelector.Option
                            src={`/chain/${value.toLowerCase()}.png`}
                            key={value}
                            value={value}
                          >
                            {chain.name}
                          </CryptoSelector.Option>
                        );
                      })}
                    </CryptoSelector.Options>
                  </CryptoSelector>
                </CryptoSelectorDropdownBox>
              </div>
            </div>

            <div>
              <Subtitle variant="modal-black">
                {t("receive.address.label")}
              </Subtitle>
              <TextInput
                value={sender ?? ""}
                disabled={true}
                showCopyIcon={true}
                onClickCopy={async () => {
                  await navigator.clipboard.writeText(sender ?? "");
                  sendEvent(CLICK_ON_COPY_ICON_RECEIVE_FLOW, {
                    "Wallet Provider": activeProviderKey,
                  });
                  setIsOpenCopied(true);
                }}
              />
              {showCopied && (
                <ErrorMessage
                  variant="info"
                  className="justify-center font-normal"
                  displayIcon={false}
                >
                  <Trans
                    t={t}
                    i18nKey="receive.copied"
                    components={{
                      strong: <span className="text-pink-300" />,
                    }}
                  />
                </ErrorMessage>
              )}
            </div>
            {isDisconnected && (
              <ConnectToWalletWarning modalType="Receive Modal" />
            )}

            {!isDisconnected && (
              <PrimaryButton
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    step: "setup",
                  }));
                  sendEvent(CLICK_ON_REQUEST_FUNDS, {
                    "Wallet Provider": activeProviderKey,
                  });
                }}
                variant="outline-primary"
                data-testid="receive-modal-receive-button"
              >
                {t("receive.button")}
              </PrimaryButton>
            )}
          </div>
        </section>
      </form>
    </section>
  );
};

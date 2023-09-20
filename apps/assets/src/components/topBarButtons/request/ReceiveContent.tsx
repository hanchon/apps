// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import React, { useEffect, useMemo, useState } from "react";
import { PrimaryButton, Title } from "ui-helpers";
import { useTranslation } from "next-i18next";
import { CryptoSelector } from "ui-helpers";
import QRCode from "react-qr-code";

import { StoreType } from "evmos-wallet";
import { CopyPasteIcon, ReceiveIcon } from "icons";
import { useWalletAccountByPrefix } from "../hooks/useAccountByPrefix";
import { CryptoSelectorDropdownBox } from "ui-helpers";
import { CryptoSelectorTitle } from "ui-helpers";
import { chains } from "@evmos-apps/registry";
import { Prefix } from "evmos-wallet/src/registry-actions/types";
import { useAccount } from "wagmi";
import { useSelector } from "react-redux";
import { RequestModalProps } from "./RequestModal";
import {
  CLICK_ON_COPY_ICON_RECEIVE_FLOW,
  CLICK_ON_DISPLAY_FORMAT,
  CLICK_ON_REQUEST_FUNDS,
  SELECT_NETWORK_RECEIVE_FLOW,
  useTracker,
} from "tracker";

export const ReceiveContent = ({
  setState,
}: {
  setState: RequestModalProps["setState"];
}) => {
  const { t } = useTranslation();
  const { sendEvent } = useTracker();
  const [walletFormat, setWalletFormat] = useState("0x");
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const [selectedNetworkPrefix, setSelectedNetworkPrefix] =
    useState<Prefix>("evmos");
  const selectedChain = chains[selectedNetworkPrefix];
  const { data } = useWalletAccountByPrefix(
    selectedNetworkPrefix,
  );

  const sender =
    walletFormat === "0x" ? wallet.evmosAddressEthFormat : data?.bech32Address;
  const { connector, isConnected, address } = useAccount();

  const networkOptions = useMemo(() => {
    if (connector?.id === "metaMask") {
      return ["evmos"] as Prefix[];
    }
    return Object.values(chains).map(({ prefix }) => prefix);
  }, [connector]);

  useEffect(() => {
    if (selectedNetworkPrefix !== "evmos") {
      setWalletFormat("IBC");
    }
  }, [selectedNetworkPrefix]);

  return (
    <section className="space-y-3">
      <Title
        variant="modal-black"
        icon={<ReceiveIcon className="text-pink-300" />}
      >
        {t("receive.title")}
      </Title>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <section>
          <div className="flex pt-8 flex-col gap-5">
            {/* TO MrSir: on the click add this event: sendEvent(CLICK_ON_SHARE_QR_CODE) */}
            <div className="flex gap-2 flex-col">
              <div className="bg-white p-2 w-44 h-44 rounded-xl self-center">
                <QRCode
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={sender ?? ""}
                />
              </div>
              <span className="text-red text-xs self-center">
                {t("receive.share.qr")}
              </span>
            </div>

            <div className="flex gap-1.5 flex-col">
              <span className="text-xs text-gray-300">
                {t("receive.format.label")}
              </span>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {/* TODO: only if evmos */}
                  {selectedNetworkPrefix === "evmos" && (
                    <button
                      onClick={() => {
                        setWalletFormat("0x");
                        sendEvent(CLICK_ON_DISPLAY_FORMAT, {
                          type: "0x",
                        });
                      }}
                      className={`rounded text-sm text-black p-3 h-11 w-11 text-center flex justify-center items-center  ${walletFormat === "0x" ? "bg-[#FF9E90]" : "bg-pink-200"
                        }`}
                    >
                      0x
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setWalletFormat("IBC");
                      sendEvent(CLICK_ON_DISPLAY_FORMAT, {
                        type: "IBC",
                      });
                    }}
                    className={`rounded text-sm text-black p-3 h-11 w-11 text-center flex justify-center items-center ${walletFormat === "IBC" ? "bg-[#FF9E90]" : "bg-pink-200"
                      }`}
                  >
                    IBC
                  </button>
                </div>
                {/* TODO: network selector */}
                <CryptoSelectorDropdownBox>
                  <CryptoSelectorTitle>
                    {t("transfer.section.asset.network")}
                  </CryptoSelectorTitle>
                  <CryptoSelector
                    value={selectedNetworkPrefix}
                    onChange={(prefix) => {
                      setSelectedNetworkPrefix(prefix);
                      sendEvent(SELECT_NETWORK_RECEIVE_FLOW, {
                        network: prefix,
                      });
                    }}
                  >
                    <CryptoSelector.Button
                      src={`/assets/chains/${selectedNetworkPrefix}.png`}
                    >
                      {selectedChain.name}
                    </CryptoSelector.Button>
                    <CryptoSelector.Options
                      label={t("transfer.section.network.label")}
                      className="right-0"
                    >
                      {networkOptions.map((value) => {
                        const chain = chains[value];
                        return (
                          <CryptoSelector.Option
                            src={`/assets/chains/${value}.png`}
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

            <div className="w-full rounded-md bg-gray-500 py-2 px-3 text-xs font-medium flex justify-between items-center space-x-5">
              <span className="text-sm overflow-hidden">{sender}</span>
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(sender ?? "");
                  sendEvent(CLICK_ON_COPY_ICON_RECEIVE_FLOW);
                }}
                className=""
              >
                <CopyPasteIcon height={32} width={32} />
              </button>
            </div>

            <PrimaryButton
              // TODO: change variant to outline-primary if the user doesn't have enough balance to pay the fee
              // variant="outline-primary"
              onClick={() => {
                setState((prev) => ({
                  ...prev,
                  step: "setup",
                }));
                sendEvent(CLICK_ON_REQUEST_FUNDS);
              }}
              className="w-full text-lg rounded-md capitalize mt-5"
            // TODO: we should change the message and the action depending if the user has enought balance to pay the fee or if we have to redirect them to axelar page
            // "transfer.swap.button.text" - "transfer.bridge.button.text"
            >
              {t("receive.button")}
            </PrimaryButton>
          </div>
        </section>
      </form>
    </section>
  );
};

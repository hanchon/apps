// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import React, { useEffect, useMemo, useState } from "react";
import { Label, PrimaryButton, Tabs, TextInput, Title } from "ui-helpers";
import { useTranslation } from "next-i18next";
import { CryptoSelector } from "ui-helpers";
import QRCode from "react-qr-code";

import { StoreType } from "evmos-wallet";
import { ReceiveIcon, ShareIcon } from "icons";
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

  const addressProps = [
    {
      onClick: () => {
        {
          setWalletFormat("0x");
          sendEvent(CLICK_ON_DISPLAY_FORMAT, {
            type: "0x",
          });
        }
      },
      type: "0x",
      option: walletFormat,
      text: "0x",
    },
    {
      onClick: () => {
        setWalletFormat("IBC");
        sendEvent(CLICK_ON_DISPLAY_FORMAT, {
          type: "IBC",
        });
      },
      type: "IBC",
      option: walletFormat,
      text: "IBC",
    },
  ];

  return (
    <section className="space-y-8">
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
        <section className="space-y-8">
          <div className="flex flex-col gap-5">
            {/* TO MrSir: on the click add this event: sendEvent(CLICK_ON_SHARE_QR_CODE) */}
            <div className="flex gap-2 flex-col">
              <div className="bg-white p-2 w-44 h-44 rounded-xl self-center">
                <QRCode
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={sender ?? ""}
                />
              </div>
              <div className="flex items-center space-x-2 self-center">
                <span className="text-pink-300 text-xs md:text-sm">
                  {t("receive.share.qr")}
                </span>
                <ShareIcon className="w-3 h-4 md:w-5 md:h-4" />
              </div>
            </div>
            <div className="">
              <Label> {t("receive.format.label")}</Label>
              <div className="flex justify-between flex-row items-end">
                {/* TODO: only if evmos */}
                <Tabs tabsProps={addressProps} variant="pink-small" />
                <div className="flex justify-between">
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
            </div>

            <TextInput
              value={sender}
              disabled={true}
              showCopyIcon={true}
              onClickCopy={async () => {
                await navigator.clipboard.writeText(sender ?? "");
                sendEvent(CLICK_ON_COPY_ICON_RECEIVE_FLOW);
              }}
            />

            <PrimaryButton
              onClick={() => {
                setState((prev) => ({
                  ...prev,
                  step: "setup",
                }));
                sendEvent(CLICK_ON_REQUEST_FUNDS);
              }}
              variant="primary-lg"
            >
              {t("receive.button")}
            </PrimaryButton>
          </div>
        </section>
      </form>
    </section>
  );
};

import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  Address,
  getPrefix,
  normalizeToCosmosAddress,
  useAddressInput,
} from "evmos-wallet";
import { chains } from "@evmos-apps/registry";
import { CryptoSelector, ErrorMessage, Tabs, TextInput } from "ui-helpers";
import { Prefix, TokenMinDenom } from "evmos-wallet/src/registry-actions/types";
import { useWalletAccountByPrefix } from "../hooks/useAccountByPrefix";
import { useTranslation } from "next-i18next";
import { ICONS_TYPES } from "constants-helper";

export const AccountSelector = ({
  value,
  onChange,
  networkOptions,
}: PropsWithChildren<{
  value?: Address<Prefix>;
  onChange: (value?: Address<Prefix>) => void;
  networkOptions: Prefix[];
}>) => {
  const { address, inputProps, errors, setValue } = useAddressInput(value);

  const [prefix, setChainPrefix] = useState<Prefix>("evmos");
  const [requestedPrefix, setRequestedPrefix] = useState<Prefix | undefined>(
    undefined
  );

  const { data, error } = useWalletAccountByPrefix(requestedPrefix);

  useEffect(() => {
    if (!requestedPrefix) {
      return;
    }
    setRequestedPrefix(undefined);

    if (data) setValue(data.bech32Address);
  }, [data, error]);

  useEffect(() => {
    if (!address) {
      return;
    }
    setChainPrefix(getPrefix(normalizeToCosmosAddress(address)));
  }, [address]);

  const chain = prefix ? chains[prefix] : chains.evmos;

  useEffect(() => {
    if (address !== value) {
      onChange?.(address);
    }
  }, [address]);

  const { t } = useTranslation();

  const WALLET_TAB_TYPES = {
    WALLET: "wallet",
    OTHER: "other",
  };

  useEffect(() => {
    if (networkOptions.includes(chain.prefix)) return;
    setChainPrefix(networkOptions[0]);
  }, [networkOptions]);

  const [walletTab, setWalletTab] = useState(WALLET_TAB_TYPES.WALLET);
  const walletProps = [
    {
      onClick: () => setWalletTab(WALLET_TAB_TYPES.WALLET),
      type: WALLET_TAB_TYPES.WALLET,
      option: walletTab,
      text: t("transfer.section.to.wallet"),
    },
    {
      onClick: () => setWalletTab(WALLET_TAB_TYPES.OTHER),
      type: WALLET_TAB_TYPES.OTHER,
      option: walletTab,
      text: t("transfer.section.to.wallet.other"),
    },
  ];

  return (
    <div className="flex flex-col space-y-3 mb-8">
      <div className="flex md:justify-between md:flex-row flex-col space-y-4 md:space-y-0">
        <Tabs tabsProps={walletProps} variant="pink" />

        <div className="flex justify-end">
          <CryptoSelector
            value={prefix}
            onChange={(value) => {
              setRequestedPrefix(value);
            }}
          >
            <CryptoSelector.Button src={`/assets/chains/${chain.prefix}.png`}>
              {chain.name}
            </CryptoSelector.Button>
            <CryptoSelector.Options
              label={t("transfer.section.network.label")}
              className="right-0"
              variant="multiple"
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
        </div>
      </div>
      <div className="space-y-2">
        {/* TODO: add the prefilled address to the input */}
        <TextInput
          placeholder={
            walletTab !== WALLET_TAB_TYPES.WALLET
              ? t("transfer.section.to.placeholder")
              : ""
          }
          // TODO: change it Keplr depending on the wallet: ICONS_TYPES.KEPLR
          extensionIcon={
            walletTab === WALLET_TAB_TYPES.WALLET
              ? ICONS_TYPES.METAMASK
              : undefined
          }
          disabled={walletTab === WALLET_TAB_TYPES.WALLET}
          {...inputProps}
        />
        {errors?.map((error, index) => {
          return (
            <ErrorMessage key={index}>
              {error === "INVALID_ADDRESS" && <>Invalid Address</>}
              {error === "INVALID_PREFIX" && <>Network not supported</>}
            </ErrorMessage>
          );
        })}
      </div>
    </div>
  );
};

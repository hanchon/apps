import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  Address,
  getActiveProviderKey,
  getPrefix,
  normalizeToCosmosAddress,
  useAddressInput,
} from "evmos-wallet";
import { chains } from "@evmos-apps/registry";
import { CryptoSelector, ErrorMessage, Tabs, TextInput } from "ui-helpers";
import { Prefix } from "evmos-wallet/src/registry-actions/types";
import { useRequestWalletAccount } from "../hooks/useAccountByPrefix";
import { useTranslation } from "next-i18next";
import { ICONS_TYPES } from "constants-helper";
import {
  CLICK_ON_COPY_ICON,
  SELECT_TO_NETWORK_SEND_FLOW,
  useTracker,
} from "tracker";
import { useAccount } from "wagmi";
const WALLET_TAB_TYPES = {
  WALLET: "my wallet",
  OTHER: "other",
};

export const AccountSelector = ({
  value,
  onChange,
  networkOptions,
  disabledNetworkOptions,
}: PropsWithChildren<{
  value?: Address<Prefix>;
  onChange: (value?: Address<Prefix>) => void;
  networkOptions: Prefix[];
  disabledNetworkOptions: Prefix[];
}>) => {
  const { t } = useTranslation();
  const { sendEvent } = useTracker();
  const { address, inputProps, errors, setValue } = useAddressInput(value);
  const connectedAccount = useAccount();
  const [prefix, setChainPrefix] = useState<Prefix>("evmos");
  const [walletTab, setWalletTab] = useState(WALLET_TAB_TYPES.WALLET);

  const chain = chains[prefix];

  const { requestAccount, account } = useRequestWalletAccount();

  useEffect(() => {
    if (getActiveProviderKey() !== "keplr") return;
    if (walletTab !== WALLET_TAB_TYPES.WALLET) return;

    requestAccount(prefix);
  }, [prefix, walletTab]);

  useEffect(() => {
    if (!networkOptions.includes(prefix)) {
      setChainPrefix(networkOptions[0]);
    }
  }, [networkOptions]);

  useEffect(() => {
    if (!account) return;
    setValue(account.bech32Address);
  }, [account]);

  useEffect(() => {
    if (!address) {
      return;
    }
    setChainPrefix(getPrefix(normalizeToCosmosAddress(address)));
  }, [address]);

  useEffect(() => {
    if (address !== value) {
      onChange?.(address);
    }
  }, [address]);

  useEffect(() => {
    if (walletTab !== WALLET_TAB_TYPES.WALLET) return;

    setValue(connectedAccount.address ?? "");
  }, [connectedAccount.address, walletTab]);

  useEffect(() => {
    if (walletTab === WALLET_TAB_TYPES.OTHER) setValue("");
  }, [walletTab]);

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

  const drawIcon = () => {
    const provider = getActiveProviderKey();
    if (provider === null) {
      return undefined;
    }
    // TODO: what should we show for safe / wallet connect ?

    return ICONS_TYPES[provider.toUpperCase()];
  };

  return (
    <div className="flex flex-col space-y-3 mb-8">
      <div className="flex md:justify-between md:flex-row flex-col space-y-4 md:space-y-0">
        <Tabs tabsProps={walletProps} variant="pink" />

        <div className="flex justify-end">
          <CryptoSelector
            value={prefix}
            onChange={(value) => {
              setChainPrefix?.(value);
              sendEvent(SELECT_TO_NETWORK_SEND_FLOW, {
                network: value,
                "account provider": getActiveProviderKey(),
                "user's address or other": walletTab,
              });
            }}
          >
            <CryptoSelector.Button src={`/assets/chains/${chain.prefix}.png`}>
              {chain.name}
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
                    disabled={disabledNetworkOptions.includes(value)}
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
        <TextInput
          placeholder={
            walletTab !== WALLET_TAB_TYPES.WALLET
              ? t("transfer.section.to.placeholder")
              : ""
          }
          extensionIcon={
            walletTab === WALLET_TAB_TYPES.WALLET ? drawIcon() : undefined
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

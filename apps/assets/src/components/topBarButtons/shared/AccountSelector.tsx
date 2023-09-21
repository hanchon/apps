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
import { Trans, useTranslation } from "next-i18next";
import { SELECT_TO_NETWORK_SEND_FLOW, useTracker } from "tracker";
import { useEffectEvent } from "helpers";

const WALLET_TAB_TYPES = {
  WALLET: "my wallet",
  OTHER: "other",
}

export const AccountSelector = ({
  value,
  onChange,
  networkOptions,

  senderPrefix,
}: PropsWithChildren<{
  value?: Address<Prefix>;
  onChange: (value?: Address<Prefix>) => void;

  networkOptions: Prefix[];
  senderPrefix: Prefix;

}>) => {
  const { t } = useTranslation();
  const { sendEvent } = useTracker();
  const { address, inputProps, errors, setValue } = useAddressInput(value);
  const [prefix, setChainPrefix] = useState<Prefix>("evmos");
  const [selectedWalletTab, setSelectedWalletTab] = useState(WALLET_TAB_TYPES.WALLET);
  const activeProviderKey = getActiveProviderKey()
  const disableMyWallet = activeProviderKey !== "keplr" || (senderPrefix === prefix)

  const activeWalletTab = disableMyWallet ? WALLET_TAB_TYPES.OTHER : selectedWalletTab;
  const chain = chains[prefix];

  const { requestAccount, account } = useRequestWalletAccount();

  useEffect(() => {
    if (activeProviderKey !== "keplr") return;
    if (activeWalletTab !== WALLET_TAB_TYPES.WALLET) return;


    requestAccount(prefix);
  }, [prefix, activeWalletTab, activeProviderKey, requestAccount]);

  useEffect(() => {
    if (!networkOptions.includes(prefix)) {
      setChainPrefix(networkOptions[0]);
    }
  }, [networkOptions, prefix]);

  useEffect(() => {
    if (!account) return;
    setValue(account.bech32Address);
  }, [account, setValue]);

  useEffect(() => {
    if (!address) {
      return;
    }
    setChainPrefix(getPrefix(normalizeToCosmosAddress(address)));
  }, [address]);

  const syncAddress = useEffectEvent(() => {
    onChange?.(address);
  })
  useEffect(() => {
    if (address !== value) {
      syncAddress()
    }
  }, [address, syncAddress, value]);


  useEffect(() => {
    if (activeWalletTab === WALLET_TAB_TYPES.OTHER) return setValue("");

  }, [activeWalletTab, setValue]);


  useEffect(() => {
    if (disableMyWallet && activeWalletTab === WALLET_TAB_TYPES.WALLET) {
      setSelectedWalletTab(WALLET_TAB_TYPES.OTHER);
    }
  }, [disableMyWallet, activeWalletTab]);
  const walletProps = [
    {
      onClick: () => {
        setSelectedWalletTab(WALLET_TAB_TYPES.WALLET)
      },
      type: WALLET_TAB_TYPES.WALLET,
      option: activeWalletTab,
      text: t("transfer.section.to.wallet"),
      disabled: disableMyWallet
    },
    {
      onClick: () => setSelectedWalletTab(WALLET_TAB_TYPES.OTHER),
      type: WALLET_TAB_TYPES.OTHER,
      option: activeWalletTab,
      text: t("transfer.section.to.wallet.other"),
    },
  ];


  const inputPlaceholder = disableMyWallet ? t("transfer.section.to.placeholder.mywalletdisabled") : t("transfer.section.to.placeholder.mywalletenabled")

  return (
    <div className="flex flex-col space-y-3">
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
                "user's address or other": activeWalletTab,
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
            activeWalletTab !== WALLET_TAB_TYPES.WALLET
              ? inputPlaceholder
              : ""
          }
          extensionIcon={
            activeWalletTab === WALLET_TAB_TYPES.WALLET ? getActiveProviderKey()?.toUpperCase() : undefined
          }
          disabled={activeWalletTab === WALLET_TAB_TYPES.WALLET}
          {...inputProps}
        />

        {networkOptions.length === 1 && networkOptions.includes("evmos") && (
          <ErrorMessage variant="info" className="justify-center">
            <Trans
              i18nKey="message.only.evmos.supported"
              components={{
                strong: <span className="text-pink-300" />,
              }}
            />
          </ErrorMessage>
        )}
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

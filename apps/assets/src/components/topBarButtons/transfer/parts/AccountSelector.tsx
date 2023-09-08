import { useAccount } from "wagmi";
import React, { PropsWithChildren, useEffect, useMemo } from "react";
import {
  Address,
  getPrefix,
  normalizeToCosmosAddress,
  useAddressInput,
} from "evmos-wallet";
import { chains } from "@evmos-apps/registry";
import { CryptoSelector, ErrorMessage, TextInput } from "ui-helpers";
import { Prefix } from "evmos-wallet/src/registry-actions/types";
import { CopyPasteIcon } from "icons";
import { useAccountByPrefix } from "../hooks/useAccountByPrefix";
import { useTranslation } from "next-i18next";

export const AccountSelector = ({
  value,
  onChange,
}: PropsWithChildren<{
  value?: Address<Prefix>;
  onChange: (value?: Address<Prefix>) => void;
}>) => {
  const { address, inputProps, errors, setValue } = useAddressInput(value);
  const networkOptions = useMemo(
    () => Object.values(chains).map(({ prefix }) => prefix),
    []
  );
  const [prefix, setChainPrefix] = React.useState<Prefix>("evmos");
  const [requestedPrefix, setRequestedPrefix] = React.useState<
    Prefix | undefined
  >(undefined);

  const { data, error } = useAccountByPrefix(requestedPrefix);

  useEffect(() => {
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

  return (
    <div className="flex flex-col relative space-y-3 mb-8">
      <div className="relative">
        <CryptoSelector
          value={prefix}
          onChange={(value) => {
            setRequestedPrefix(value);
          }}
        >
          <CryptoSelector.Button src={`/assets/chains/${chain.prefix}.png`}>
            {chain.name}
          </CryptoSelector.Button>
          <CryptoSelector.Options>
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
      <div className="space-y-2">
        <TextInput
          inputProps={inputProps}
          placeholder={t("transfer.section.to.placeholder")}
        />
        {errors?.map((error) => {
          return (
            <ErrorMessage>
              {error === "INVALID_ADDRESS" && <>Invalid Address</>}
              {error === "INVALID_PREFIX" && <>Network not supported</>}
            </ErrorMessage>
          );
        })}
      </div>
    </div>
  );
};

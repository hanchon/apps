import React, { PropsWithChildren, useMemo, useState } from "react";
import { AmountInput } from "ui-helpers";
import { chains } from "@evmos-apps/registry";
import { Prefix, TokenMinDenom } from "evmos-wallet/src/registry-actions/types";
import { CryptoSelector } from "./CryptoSelector";
import { getTokenByMinDenom } from "evmos-wallet";
type Asset = {
  denom: TokenMinDenom;
  amount: bigint;
};
export const AssetSelector = ({
  value,
  onChange,
}: PropsWithChildren<{
  value: Asset;
  onChange: (value: Asset) => void;
}>) => {
  const [network, setNetwork] = useState<Prefix>("evmos");
  const selectedChain = chains[network];
  const selectedToken = getTokenByMinDenom(value.denom);
  const networkOptions = useMemo(
    () => Object.values(chains).map(({ prefix }) => prefix),
    []
  );

  const tokenOptions = useMemo(() => {
    const nativeNetworkTokens = selectedChain.currencies.map(
      ({ minCoinDenom }) => minCoinDenom
    );
    if (selectedChain.prefix === "evmos") return nativeNetworkTokens;

    const evmosTokens = chains.evmos.currencies.map(
      ({ minCoinDenom }) => minCoinDenom
    );
    return [...nativeNetworkTokens, ...evmosTokens];
  }, [network]);
  return (
    <>
      <div className="flex justify-between relative">
        <div>
          <h3>Token</h3>
          <CryptoSelector
            value={value.denom}
            onChange={(denom) =>
              onChange({
                ...value,
                denom,
              })
            }
          >
            <CryptoSelector.Button src={"/assets/tokens/evmos.png"}>
              {selectedToken.name}
            </CryptoSelector.Button>
            <CryptoSelector.Options>
              {tokenOptions.map((token) => {
                return (
                  <CryptoSelector.Option
                    src={"/assets/tokens/evmos.png"}
                    key={token}
                    value={token}
                  >
                    {getTokenByMinDenom(token).name}
                  </CryptoSelector.Option>
                );
              })}
            </CryptoSelector.Options>
          </CryptoSelector>
        </div>
        <div>
          <h3>Network</h3>
          <CryptoSelector value={network} onChange={setNetwork}>
            <CryptoSelector.Button src={"/assets/tokens/evmos.png"}>
              {selectedChain.name}
            </CryptoSelector.Button>
            <CryptoSelector.Options>
              {networkOptions.map((value) => {
                const chain = chains[value];
                return (
                  <CryptoSelector.Option
                    src={"/assets/tokens/evmos.png"}
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
      <AmountInput
        value={value.amount}
        onChange={(amount) => {
          onChange({
            ...value,
            amount,
          });
        }}
      />
    </>
  );
};

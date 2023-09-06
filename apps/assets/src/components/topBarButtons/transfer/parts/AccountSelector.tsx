import { useAccount } from "wagmi";
import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { Address, useAddressInput } from "evmos-wallet";
import { chains } from "@evmos-apps/registry";
import { CryptoSelector } from "./CryptoSelector";
import { Prefix } from "evmos-wallet/src/registry-actions/types";

export const AccountSelector = ({
  value,
  onChange,
}: PropsWithChildren<{
  value?: Address<Prefix>;
  onChange: (value?: Address<Prefix>) => void;
}>) => {
  const account = useAccount();
  const { prefix, address, inputProps, errors } = useAddressInput(
    account.address
  );
  const networkOptions = useMemo(
    () => Object.values(chains).map(({ prefix }) => prefix),
    []
  );

  const chain = prefix ? chains[prefix] : chains.evmos;

  useEffect(() => {
    if (address !== value) {
      onChange?.(address);
    }
  }, [address]);
  return (
    <div>
      <CryptoSelector value={chain.prefix} onChange={() => {}}>
        <CryptoSelector.Button src={"/assets/tokens/evmos.png"}>
          {chain.name}
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

      <input
        className="border w-full p-2 rounded"
        placeholder="You can send between My Wallet or to Other recipient"
        {...inputProps}
      />
      {errors?.map((error) => {
        return (
          <p>
            {error === "INVALID_ADDRESS" && <>Invalid Address</>}
            {error === "INVALID_PREFIX" && <>Network not supported</>}
          </p>
        );
      })}
    </div>
  );
};

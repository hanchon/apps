import { useAccount } from "wagmi";
import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { Address, useAddressInput } from "evmos-wallet";
import { chains } from "@evmos-apps/registry";
import { CryptoSelector } from "./CryptoSelector";
import { Prefix } from "evmos-wallet/src/registry-actions/types";
import { CopyPasteIcon } from "icons";

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
    <div className="flex flex-col space-y-3 mb-8">
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
      </div>
      <div className="space-y-2">
        <div className="w-full rounded-md bg-gray-500 py-2 px-3 text-xs font-medium flex justify-between space-x-5">
          <input
            className="w-full bg-transparent focus-visible:outline-none placeholder:text-gray-400"
            placeholder="You can send between My Wallet or to Other recipient"
            {...inputProps}
          />
          <button
            className=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <CopyPasteIcon />
          </button>
        </div>
        {errors?.map((error) => {
          return (
            <p className="text-red-300 text-xs font-medium pl-4">
              {error === "INVALID_ADDRESS" && <>Invalid Address</>}
              {error === "INVALID_PREFIX" && <>Network not supported</>}
            </p>
          );
        })}
      </div>
    </div>
  );
};

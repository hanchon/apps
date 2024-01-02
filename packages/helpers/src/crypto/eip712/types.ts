import type { TypedDataDomain } from "abitype";

import { Hex } from "viem";

export type EvmosTypedDataDomain =
  | TypedDataDomain
  | {
      chainId: Hex;
    };

export type EvmosTypedData = {
  domain?: EvmosTypedDataDomain;
  message: Record<string, unknown>;
  primaryType: string;
  types: Record<
    string,
    {
      name: string;
      type: string;
    }[]
  >;
};

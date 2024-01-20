// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { wagmiConfig } from "../wallet";
import { getTokens } from "./get-tokens";

import { makeBalance } from "./utils/make-balance";
import { Hex, erc20Abi } from "viem";
import { FormattedBalance } from "./types";
import { multicall } from "wagmi/actions";
import { normalizeToEth } from "helpers/src/crypto/addresses/normalize-to-eth";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { Address } from "helpers/src/crypto/addresses/types";

export async function getERC20TokenBalances({ address }: { address: Address }) {
  const tokens = getTokens().filter(({ erc20Address }) => erc20Address);
  const ethAddress = normalizeToEth(address);

  const response = await multicall(wagmiConfig, {
    contracts: tokens.map((token) => ({
      abi: erc20Abi,
      address: token.erc20Address as Hex,
      functionName: "balanceOf",
      args: [ethAddress],
    })),
  });

  const evmosAddress = normalizeToCosmos(address);
  return response
    .reduce<FormattedBalance[]>((acc, response, index) => {
      if (response.status !== "success") return acc;
      const token = tokens[index];
      if (!token) return acc;

      acc.push(
        makeBalance(
          token,
          evmosAddress,
          BigInt(response.result ?? "0"),
          "ERC20",
        ),
      );
      return acc;
    }, [])
    .filter(({ value }) => value > 0n);
}

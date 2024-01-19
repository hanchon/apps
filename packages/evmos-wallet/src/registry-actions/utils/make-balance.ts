// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { FormattedBalance, Token } from "../types";
import { formatUnits } from "./format-units";
import { Address } from "helpers/src/crypto/addresses/types";

export const makeBalance = (
  token: Token,
  address: Address,
  value: string | bigint,
  type: "ICS20" | "ERC20",
): FormattedBalance => {
  const amount = BigInt(value);

  return {
    address: normalizeToCosmos(address),
    decimals: token.decimals,
    formatted: formatUnits(amount, token.decimals, "short"),
    formattedLong: formatUnits(amount, token.decimals, "long"),
    tokenSourcePrefix: token.sourcePrefix,
    symbol: token.symbol,
    tokenRef: token.ref,
    denom: token.denom,
    minDenom: token.minCoinDenom,
    value: amount,
    type,
  };
};

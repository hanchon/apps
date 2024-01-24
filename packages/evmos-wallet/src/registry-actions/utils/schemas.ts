// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";
import { TokenRef } from "../types";
import { Hex, isHex } from "viem";
import { isString } from "helpers";

import { getPrefixes } from "../get-prefixes";
import { getTokens } from "../get-tokens";
import { getChains } from "../get-chain";
import { Address } from "helpers/src/crypto/addresses/types";
import { isValidHexAddress } from "helpers/src/crypto/addresses/is-valid-hex-address";
import { isValidCosmosAddress } from "helpers/src/crypto/addresses/is-valid-cosmos-address";

export const TokenRefSchema = z.custom<TokenRef>((v) => {
  return getTokens().find((token) => token.ref === v) !== undefined;
});

export const ChainPrefixSchema = z.custom<string>((v) => {
  return getChains().find((chain) => chain.prefix === v) !== undefined;
});

export const HexSchema = z
  .custom<Hex>((v) => {
    if (!isString(v)) return false;

    return isHex(v, { strict: false });
  })
  .transform<Hex>((v) => (v.startsWith("0x") ? v : `0x${v}`));

export const AddressSchema = z.custom<Address>((v) => {
  if (!isString(v)) return false;
  return isValidHexAddress(v) || isValidCosmosAddress(v, [...getPrefixes()]);
});

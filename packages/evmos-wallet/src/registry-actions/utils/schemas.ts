import { chains } from "@evmos-apps/registry";
import { z } from "zod";
import { getTokenMinDenomList } from "../get-token-min-denom-list";
import { TokenMinDenom, Prefix } from "../types";
import { Hex, isHex } from "viem";
import { isString } from "helpers";

export const MinDenomSchema = z.custom<TokenMinDenom>((v) => {
  return getTokenMinDenomList().includes(v as TokenMinDenom);
});

export const ChainPrefixSchema = z.custom<Prefix>((v) => {
  return Object.keys(chains).includes(v as Prefix);
});

export const HexSchema = z
  .custom<Hex>((v) => {
    if (!isString(v)) return false;
    return isHex(v, { strict: false });
  })
  .transform<Hex>((v) => (v.startsWith("0x") ? v : `0x${v}`));

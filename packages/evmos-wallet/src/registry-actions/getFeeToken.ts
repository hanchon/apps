import { chains } from "@evmos-apps/registry";
import { Address, getPrefix } from "../wallet";

import { Prefix, TokenRef } from "./types";
import { normalizeToPrefix } from "./utils/normalize-to-prefix";
import { getToken } from "./get-token";

export const getFeeToken = (address: Prefix | Address<Prefix>) => {
  const { prefix, feeToken } = chains[normalizeToPrefix(address)];
  return getToken(prefix, feeToken)!;
};

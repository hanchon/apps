import { chains } from "@evmos-apps/registry";
import { Address, getPrefix } from "../wallet";

import { Prefix } from "./types";

export const getChainByAddress = (address: Address<Prefix>) => {
  return chains[getPrefix(address)];
};

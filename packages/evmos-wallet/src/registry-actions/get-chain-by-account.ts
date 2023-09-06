import { chains } from "@evmos-apps/registry";
import { Address, getPrefix } from "../wallet";
import { isValidCosmosAddress } from "../wallet/utils/addresses/is-valid-cosmos-address";
import { Prefix } from "./types";

export const getChainByAddress = (address: Address<Prefix>) => {
  return chains[isValidCosmosAddress(address) ? getPrefix(address) : "evmos"];
};

import {
  Address,
  getPrefix,
  isValidCosmosAddress,
  isValidHexAddress,
} from "../../wallet";
import { Prefix } from "../types";
export type Prefixish = Address<Prefix> | Prefix;

export const normalizeToPrefix = (address: Prefixish) => {
  if (isValidHexAddress(address) || isValidCosmosAddress(address)) {
    return getPrefix(address);
  }
  return address;
};

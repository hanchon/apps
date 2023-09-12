import {
  Address,
  getPrefix,
  isValidCosmosAddress,
  isValidHexAddress,
} from "../../wallet";
import { Prefix } from "../types";

export const normalizeToPrefix = (address: Address<Prefix> | Prefix) => {
  if (isValidHexAddress(address) || isValidCosmosAddress(address)) {
    return getPrefix(address);
  }
  return address;
};

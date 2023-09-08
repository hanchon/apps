import { Prefix } from "../../../registry-actions/types";
import { Address, CosmosAddress, HexAddress } from "./types";

export const getPrefix = <T extends Prefix>(
  address: Address<T>
): Prefix extends T ? "evmos" : T => {
  if (address.startsWith("0x")) {
    return "evmos" as never;
  }
  return address.split("1")[0] as never;
};

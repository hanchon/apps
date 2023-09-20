import { Prefix } from "../../../registry-actions/types";
import { Address, CosmosAddress, HexAddress } from "./types";

export const getPrefix = <T extends Address<Prefix>>(
  address: T,
): T extends CosmosAddress<infer U> ? U : "evmos" => {
  if (address.startsWith("0x")) {
    return "evmos" as never;
  }
  return address.split("1")[0] as never;
};

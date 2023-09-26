import { Address } from "./types";
import { isValidCosmosAddress } from "./is-valid-cosmos-address";
import { isValidHexAddress } from "./is-valid-hex-address";

export const isEvmosAddress = (
  address: string,
): address is Address<"evmos"> => {
  return isValidCosmosAddress(address, ["evmos"]) || isValidHexAddress(address);
};

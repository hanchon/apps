import { getPrefix } from "helpers/src/crypto/addresses/get-prefix";
import { isValidCosmosAddress } from "helpers/src/crypto/addresses/is-valid-cosmos-address";
import { isValidHexAddress } from "helpers/src/crypto/addresses/is-valid-hex-address";

export const normalizeToPrefix = (address: string) => {
  if (isValidHexAddress(address) || isValidCosmosAddress(address)) {
    return getPrefix(address);
  }
  return address;
};

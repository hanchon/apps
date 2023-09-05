import { CosmosAddress } from "./types";

export const getPrefix = <TPrefix extends string>(
  address: CosmosAddress<TPrefix>
): TPrefix => {
  return address.split("1")[0] as TPrefix;
};

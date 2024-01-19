import { Address } from "./types";

export const getPrefix = (address: Address): string => {
  if (address.startsWith("0x")) {
    return "evmos";
  }
  return address.split("1")[0] as string;
};

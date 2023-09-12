import { ics20Abi, stakingAbi } from "@evmos-apps/registry/src/abi";
import { erc20ABI } from "wagmi";

export const ABI = {
  ics20: ics20Abi,
  staking: stakingAbi,
  erc20: erc20ABI,
} as const;

export type ABIKey = keyof typeof ABI;
export function getAbi(abiKey: ABIKey) {
  return ABI[abiKey];
}

export const ICS20_ADDRESS = "0x0000000000000000000000000000000000000802";

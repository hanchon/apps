import { formatUnits } from "viem/utils";

export function fromAtto(value: bigint | string, decimals: number = 8): number {
  if (typeof value === "string") {
    const [sanitized] = value.match(/^(\-?\d+)/) ?? [];
    if (!sanitized) return NaN;
    value = BigInt(sanitized);
  }
  return Number(formatUnits(value, decimals));
}

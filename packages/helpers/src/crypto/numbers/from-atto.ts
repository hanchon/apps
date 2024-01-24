// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { formatUnits } from "viem/utils";

export function fromAtto(value: bigint | string, decimals: number = 8): number {
  if (typeof value === "string") {
    const [sanitized] = value.match(/^(\-?\d+)/) ?? [];
    if (!sanitized) return NaN;
    value = BigInt(sanitized);
  }
  return Number(formatUnits(value, decimals));
}

import { multiply } from "helpers";

export const buffGasEstimate = (gas: bigint) => multiply(gas, 1.5);

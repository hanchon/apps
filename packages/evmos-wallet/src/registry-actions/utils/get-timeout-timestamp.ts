const ONE_DAY_IN_MILLISECONDS = 60 * 60 * 24 * 1000;
export const getTimeoutTimestamp = () =>
  BigInt(Date.now() + ONE_DAY_IN_MILLISECONDS) * 1000000n;

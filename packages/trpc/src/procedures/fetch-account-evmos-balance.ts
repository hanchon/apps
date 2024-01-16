import { cachedFetchChains } from "@evmosapps/registry/src/fetch-chains";

export const fetchAccountBalance = async ({}: {
  chain: string;
  address: string;
}) => {
  const chains = cachedFetchChains();
};

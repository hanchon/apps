type NetworkUrls = {
  http: [string, ...string[]];
};
export type Token = {
  name: string;
  description: string;
  images: {
    png: string;
    svg?: string;
  };
  decimals: number;
  denom: string;
  minCoinDenom: string;
  cosmosDenom: string;
  type: "IBC" | "ERC20";
  erc20Address: string;
  category: "bitcoin" | "ethereum" | "stablecoin" | "cosmos" | "polygon" | null;
};
export interface Chain {
  prefix: string;
  gasPriceStep: {
    low: string;
    average: string;
    high: string;
  };
  name: string;
  cosmosId: string;
  evmId: number | null;
  clientId: string | null;
  nativeCurrency: string;

  currencies: [Token, ...Token[]];
  cosmosRest: NetworkUrls;
  cosmosGRPC: NetworkUrls | null;
  evmRest: NetworkUrls | null;
  tendermint: NetworkUrls | null;
}

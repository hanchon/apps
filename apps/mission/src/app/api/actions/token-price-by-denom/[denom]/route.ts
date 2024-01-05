import { fetchTokenPriceByDenom } from "@evmosapps/evmos-wallet/src/server/fetch-token-price-by-denom";
// import { fetchTokenPrices } from "@evmosapps/evmos-wallet/src/server/fetch-token-prices";

export const revalidate = 300;
export async function GET(
  _: Request,
  { params }: { params: { denom: string } }
) {
  return Response.json(await fetchTokenPriceByDenom(params.denom));
}
// export async function generateStaticParams() {
//   const tokens = await fetchTokenPrices();

//   return Object.values(tokens).map(({ coinDenom }) => ({
//     denom: coinDenom.toLowerCase(),
//   }));
// }

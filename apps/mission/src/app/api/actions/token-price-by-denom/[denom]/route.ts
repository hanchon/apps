import { fetchTokenPriceByDenom } from "@evmosapps/evmos-wallet/src/server/fetch-token-price-by-denom";
export const revalidate = 60 * 5;
export async function GET(
  _: Request,
  { params }: { params: { denom: string } }
) {
  return Response.json(await fetchTokenPriceByDenom(params.denom));
}

import { erc20ABI } from "wagmi";
import { Address, evmosClient } from "../wallet";
import { normalizeToEth, normalizeToEvmos } from "../wallet/utils/addresses";
import { makeBalance } from "./utils/make-balance";
import { TokenDenom } from "./types";
import { getTokenByDenom } from "./get-token-by-denom";

export async function getERC20TokenBalanceByDenom({
  address,
  denom,
}: {
  address: Address<"evmos">;
  denom: TokenDenom;
}) {
  const token = getTokenByDenom(denom);
  const amount = await evmosClient.readContract({
    address: token.erc20Address,
    abi: erc20ABI,
    functionName: "balanceOf",
    args: [normalizeToEth(address)],
  });
  return makeBalance(token.denom, normalizeToEvmos(address), amount, "ERC20");
}

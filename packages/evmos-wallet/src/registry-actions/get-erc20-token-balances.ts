import { erc20ABI } from "wagmi";
import { Address, evmosClient } from "../wallet";
import { getTokens } from "./get-tokens";
import { normalizeToEth, normalizeToEvmos } from "../wallet/utils/addresses";
import { makeBalance } from "./utils/make-balance";

export async function getERC20TokenBalances({
  address,
}: {
  address: Address<"evmos">;
}) {
  const tokens = getTokens();
  const ethAddress = normalizeToEth(address);
  const response = await evmosClient.multicall({
    contracts: tokens.map((token) => ({
      abi: erc20ABI,
      address: token.erc20Address,
      functionName: "balanceOf",
      args: [ethAddress],
    })),
  });
  const evmosAddress = normalizeToEvmos(address);
  return response
    .map((response, index) => {
      const token = tokens[index];
      return makeBalance(
        token.denom,
        evmosAddress,
        response.result ?? "0",
        "ERC20"
      );
    })
    .filter(({ value }) => value > 0n);
}

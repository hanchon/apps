import { erc20ABI } from "wagmi";
import { buffGasEstimate } from "../../ibc";
import { normalizeToEth, evmosClient, Address } from "../../wallet";
import { getTokenByMinDenom } from "../get-token-by-min-denom";
import { TokenMinDenom } from "../types";

export const prepareContractERC20Transfer = async ({
  sender,
  receiver,
  token,
}: {
  sender: Address<"evmos">;
  receiver: Address<"evmos">;
  token: {
    denom: TokenMinDenom;
    amount: bigint;
  };
}) => {
  const tokenConfig = getTokenByMinDenom(token.denom);
  const args = {
    abi: erc20ABI,
    functionName: "transfer",
    address: tokenConfig.erc20Address,
    args: [normalizeToEth(receiver), token.amount],
    account: normalizeToEth(sender),
  } as const;
  const { request } = await evmosClient.simulateContract(args);
  return {
    tx: request,
    estimatedGas: buffGasEstimate(await evmosClient.estimateContractGas(args)),
  };
};

import { erc20ABI } from "wagmi";

import { normalizeToEth, evmosClient, Address } from "../../wallet";
import { getTokenByMinDenom } from "../get-token-by-min-denom";
import { TokenMinDenom } from "../types";
import { writeContract } from "wagmi/actions";
import { buffGasEstimate } from "../utils/buff-gas-estimate";

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
  fee?: {
    amount: bigint;
    denom: TokenMinDenom;
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

export const writeContractERC20Transfer = async ({
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
  const prepared = await prepareContractERC20Transfer({
    sender,
    receiver,
    token,
  });
  return writeContract(prepared.tx);
};

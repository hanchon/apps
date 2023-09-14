import { erc20ABI } from "wagmi";

import { normalizeToEth, evmosClient, Address } from "../../wallet";
import { Token, TokenMinDenom } from "../types";
import { writeContract } from "wagmi/actions";
import { buffGasEstimate } from "../utils/buff-gas-estimate";

export const prepareContractERC20Transfer = async ({
  sender,
  receiver,
  token,
  amount,
}: {
  sender: Address<"evmos">;
  receiver: Address<"evmos">;
  token: Token;
  amount: bigint;
  fee?: {
    amount: bigint;
    denom: TokenMinDenom;
  };
}) => {
  const args = {
    abi: erc20ABI,
    functionName: "transfer",
    address: token.erc20Address,
    args: [normalizeToEth(receiver), amount],
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
  amount,
}: {
  sender: Address<"evmos">;
  receiver: Address<"evmos">;
  token: Token;
  amount: bigint;
}) => {
  const prepared = await prepareContractERC20Transfer({
    sender,
    receiver,
    token,
    amount,
  });
  return writeContract(prepared.tx);
};

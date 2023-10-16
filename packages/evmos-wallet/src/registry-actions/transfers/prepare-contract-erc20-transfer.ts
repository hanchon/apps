import { erc20ABI } from "wagmi";

import { normalizeToEth, evmosClient, Address } from "../../wallet";
import { TokenAmount } from "../types";
import { writeContract } from "wagmi/actions";
import { buffGasEstimate } from "../utils/buff-gas-estimate";
import { getTokenByRef } from "../get-token-by-ref";

export const prepareContractERC20Transfer = async ({
  sender,
  receiver,
  token,
}: {
  sender: Address<"evmos">;
  receiver: Address<"evmos">;
  token: TokenAmount;
}) => {
  const { erc20Address } = getTokenByRef(token.ref);
  if (!erc20Address) {
    throw new Error("Token is not an ERC20 token");
  }
  const args = {
    abi: erc20ABI,
    functionName: "transfer",
    address: erc20Address,
    args: [normalizeToEth(receiver), token.amount],
    account: normalizeToEth(sender),
  } as const;
  const estimatedGas = buffGasEstimate(
    await evmosClient.estimateContractGas(args)
  );
  const { request } = await evmosClient.simulateContract({
    ...args,
    gas: estimatedGas,
  });
  return {
    tx: request,
    estimatedGas,
  };
};

export const writeContractERC20Transfer = async ({
  sender,
  receiver,
  token,
}: {
  sender: Address<"evmos">;
  receiver: Address<"evmos">;
  token: TokenAmount;
}) => {
  const prepared = await prepareContractERC20Transfer({
    sender,
    receiver,
    token,
  });
  return writeContract(prepared.tx);
};

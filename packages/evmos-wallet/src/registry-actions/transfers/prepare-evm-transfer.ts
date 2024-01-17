import { estimateGas, sendTransaction } from "wagmi/actions";

import { TokenAmount } from "../types";
import { buffGasEstimate } from "../utils/buff-gas-estimate";
import { raise } from "helpers";
import { Address } from "helpers/src/crypto/addresses/types";
import { normalizeToEth } from "helpers/src/crypto/addresses/normalize-to-eth";
import { wagmiConfig } from "../../wallet";

export const prepareEvmTransfer = async ({
  receiver,
  amount,
}: {
  receiver: Address;
  amount: TokenAmount;
}) => {
  const args = {
    to: normalizeToEth(receiver),
    value: amount.amount,
  } as const;
  const gasEstimate = await estimateGas(wagmiConfig, {
    to: normalizeToEth(receiver),
    value: amount.amount,
  });

  return {
    tx: args,
    estimatedGas: buffGasEstimate(gasEstimate ?? raise("No gas estimate")),
  };
};

export const writeEvmTransfer = async ({
  receiver,
  amount,
}: {
  receiver: Address;
  amount: TokenAmount;
}) => {
  const response = await prepareEvmTransfer({
    receiver: normalizeToEth(receiver),
    amount,
  });

  return sendTransaction(wagmiConfig, response.tx);
};

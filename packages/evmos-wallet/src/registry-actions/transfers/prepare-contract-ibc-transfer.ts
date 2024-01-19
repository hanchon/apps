// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ics20Abi } from "@evmosapps/registry";
import { assert } from "helpers";

import { wagmiConfig } from "../../wallet";
import { TokenAmount } from "../types";
import { getIBCChannelId, getTimeoutTimestamp } from "../utils";
import { simulateContract, writeContract } from "wagmi/actions";
import { getIBCDenom } from "../utils/get-ibc-denom";
import { getTokenByRef } from "../get-token-by-ref";
import { Address } from "helpers/src/crypto/addresses/types";
import { normalizeToEth } from "helpers/src/crypto/addresses/normalize-to-eth";
import { isEvmosAddress } from "helpers/src/crypto/addresses/is-evmos-address";
export const prepareContractIBCTransfer = async ({
  sender,
  receiver,
  token,
}: {
  sender: Address;
  receiver: Address;
  token: TokenAmount;
}) => {
  assert(
    isEvmosAddress(sender),
    "Sender must be an EVMOS address to transfer through ICS20 contract",
  );
  const transferredToken = getTokenByRef(token.ref);

  const senderAddressAsHex = normalizeToEth(sender);

  const args = {
    abi: ics20Abi,
    address: "0x0000000000000000000000000000000000000802",
    account: senderAddressAsHex,
    functionName: "transfer",
    args: [
      "transfer",
      getIBCChannelId({
        sender,
        receiver,
      }),
      getIBCDenom({
        sender,
        receiver,
        token: transferredToken,
      }),
      token.amount,
      senderAddressAsHex,
      receiver as string,
      {
        revisionNumber: 0n,
        revisionHeight: 0n,
      },
      getTimeoutTimestamp(),
      "",
    ],
  } as const;
  // TODO: Hardcoding gas estimation for now due to a bug in core
  // uncomment this when the bug is fixed
  // https://linear.app/altiplanic/issue/FSE-835/hardcode-gas-estimation-value
  //
  // const estimatedGas = buffGasEstimate(
  //   await evmosClient.estimateContractGas(args)
  // );
  const estimatedGas = 72000n;
  const { request } = await simulateContract(wagmiConfig, {
    ...args,
    gas: estimatedGas,
  });
  // @ts-expect-error "Safe Wallet" SDK has a bug where this value can't be undefined
  // https://github.com/wagmi-dev/wagmi/issues/2887
  request.value = 0n;

  return {
    tx: request,
    estimatedGas,
  };
};

export const writeContractIBCTransfer = async ({
  sender,
  receiver,
  token,
}: {
  sender: Address;
  receiver: Address;
  token: TokenAmount;
}) => {
  const prepared = await prepareContractIBCTransfer({
    sender,
    receiver,
    token,
  });

  return await writeContract(wagmiConfig, prepared.tx);
};

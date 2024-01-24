// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { getAccount, getWalletClient } from "wagmi/actions";
import { assert, raise } from "helpers";
import { TypedData } from "../../utils";

import { wagmiConfig } from "../wagmi";
import { switchToEvmosChain } from "./switchToEvmosChain";

export async function signTypedDataMessage(transaction: TypedData) {
  const { address = raise("WALLET_NOT_CONNECTED") } = getAccount(wagmiConfig);

  await switchToEvmosChain();

  const client =
    (await getWalletClient(wagmiConfig)) ?? raise("PROVIDER_NOT_AVAILABLE");

  const signature = await client.request({
    method: "eth_signTypedData_v4",
    params: [address, JSON.stringify(transaction)],
  });

  assert(typeof signature === "string", "COULD_NOT_SIGN_TRANSACTION");
  return signature;
}

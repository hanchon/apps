// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EVMOS_BACKEND } from "./networkConfig";
import { fetchWithTimeout } from "./fetch";
import type { StdSignature, StdSignDoc } from "@keplr-wallet/types";

const headers = { "Content-Type": "application/json" };

interface BroadcastAminoResponse {
  tx_hash: string;
  raw_log: string;
  code: number;
}

export async function broadcastAminoBackendTxToBackend(
  signature: StdSignature,
  signed: StdSignDoc,
  network: string
) {
  try {
    const txBody = {
      signature: signature,
      signed: signed,
      network: network.toUpperCase(),
    };

    const postBroadcast = await fetchWithTimeout(
      `${EVMOS_BACKEND}/v2/tx/amino/broadcast`,
      {
        method: "post",
        body: JSON.stringify(txBody),
        headers,
      }
    );

    const response = (await postBroadcast.json()) as BroadcastAminoResponse;
    if (response.code !== 0) {
      return {
        error: true,
        message: `Transaction Failed ${response.raw_log}`,
        txhash: `0x0`,
      };
    }

    return {
      error: false,
      message: `Transaction successful!`,
      txhash: response.tx_hash,
    };
  } catch (e) {
    return {
      error: true,
      // Disabled until catching all the possible errors
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Transaction Failed ${e}`,
      txhash: `0x0`,
    };
  }
}

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { createTxRaw } from "@evmos/proto";
import { getAccount, getChainId } from "wagmi/actions";
import { assert } from "helpers";
import {
  signTypedDataMessage,
  signKeplrDirect,
  getKeplrProvider,
  wagmiConfig,
} from "../../wallet";
import { apiBroadcastEip712, apiBroadcastRawTx } from "../evmos-api/broadcast";
import { ApiPresignTx } from "../../utils";
import { getEvmosChainInfo } from "../../wallet/wagmi/chains";
import { ethToEvmos } from "helpers/src/crypto/addresses/eth-to-evmos";
import {
  COSMOS_BASED_WALLETS,
  isCosmosBasedWallet,
} from "helpers/src/crypto/wallets/is-cosmos-wallet";
import { DirectSignResponse } from "@keplr-wallet/types";
import { signLeapDirect } from "../../wallet/utils/leap/signLeapDirect";
import { DirectSignResponse as DirectSignResponseCosmjs } from "@cosmjs/proto-signing";
import { getLeapProvider } from "../../wallet/utils/leap/getLeapProvider";
const evmosInfo = getEvmosChainInfo();

async function signBackendTypedDataTransaction({
  typedData,
  legacyAmino,
}: ApiPresignTx) {
  const { address, connector } = getAccount(wagmiConfig);
  const chainId = getChainId(wagmiConfig);
  assert(
    chainId && address && connector && typedData,
    "COULD_NOT_SIGN_TRANSACTION",
  );

  const signature = await signTypedDataMessage(typedData);

  return {
    signature,
    broadcast: () =>
      apiBroadcastEip712({
        chainId,
        feePayer: ethToEvmos(address),
        feePayerSig: signature,
        body: legacyAmino.body,
        authInfo: legacyAmino.authInfo,
      }),
  } as const;
}

async function signBackendDirectTransaction(transaction: ApiPresignTx) {
  const { address, connector } = getAccount(wagmiConfig);

  assert(address && connector, "COULD_NOT_SIGN_TRANSACTION");

  assert(
    isCosmosBasedWallet(connector.name as COSMOS_BASED_WALLETS),
    "UNSUPPORTED_SIGN_METHOD",
  );
  let response: DirectSignResponse | DirectSignResponseCosmjs;
  if (connector.name === "Leap") {
    response = await signLeapDirect({
      chainId: transaction.chainId,
      sender: ethToEvmos(address),
      body: transaction.directSignDoc,
    });
  }
  response = await signKeplrDirect({
    chainId: transaction.chainId,
    sender: ethToEvmos(address),
    body: transaction.directSignDoc,
  });

  return {
    signature: response.signature.signature,
    broadcast: () =>
      apiBroadcastRawTx({
        rawTx: createTxRaw(
          response.signed.bodyBytes,
          response.signed.authInfoBytes,
          [new Uint8Array(Buffer.from(response.signature.signature, "base64"))],
        ),
      }),
  } as const;
}

export async function signApiPresignTx(presignedTx: ApiPresignTx) {
  const { address, connector } = getAccount(wagmiConfig);

  assert(address && connector, "COULD_NOT_SIGN_TRANSACTION");
  /**
   * If the connector is keplr, we need to check if the key is a ledger key.
   * If it is, we need to sign the transaction as typed data
   */
  if (connector.name === "Keplr") {
    const keplr = await getKeplrProvider();

    keplr.defaultOptions = {
      sign: {
        preferNoSetFee: presignedTx.chainId === evmosInfo.cosmosId,
      },
    };
    const key = await keplr.getKey(presignedTx.chainId);
    if (!key.isNanoLedger) return signBackendDirectTransaction(presignedTx);
  }

  /**
   * If the connector is leap, we need to check if the key is a ledger key.
   * If it is, we need to sign the transaction as typed data
   */
  if (connector.name === "Leap") {
    const leap = await getLeapProvider();

    leap.defaultOptions = {
      sign: {
        preferNoSetFee: presignedTx.chainId === evmosInfo.cosmosId,
      },
    };
    const key = await leap.getKey(presignedTx.chainId);
    if (!key.isNanoLedger) return signBackendDirectTransaction(presignedTx);
  }
  return signBackendTypedDataTransaction(presignedTx);
}

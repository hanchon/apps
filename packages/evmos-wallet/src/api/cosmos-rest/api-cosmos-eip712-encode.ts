import { z } from "zod";
import { apiCosmosFetch } from "./api-cosmos-fetch";
import { BigIntSchema } from "./validation";
import { Tx } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/v1beta1/tx_pb";

export const apiCosmosEip712Encode = (
  urls: Readonly<[string, ...string[]]>,
  tx: Tx
) => {
  console.log(Buffer.from(tx.toBinary()).toString("base64"));
  return apiCosmosFetch(
    z
      .object({
        encoded_tx: z.string(),
      })
      .passthrough(),
    urls,
    `/evmos/evm/v1/eip712_encode`,
    {
      method: "POST",
      body: JSON.stringify({
        tx_bytes: Buffer.from(tx.toBinary()).toString("base64"),
      }),
    }
  );
};

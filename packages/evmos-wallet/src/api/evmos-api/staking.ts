import { ApiPresignTxSchema } from "../../utils";
import { makeApiRequester } from "../utils/makeApiRequester";

export const apiStakingRewards = makeApiRequester(
  "/rewards",
  (params: { pubkey: string; address: string }) => ({
    transaction: {
      pubKey: params.pubkey,
      sender: params.address,
      gas: 0,
    },
  }),
  ApiPresignTxSchema
);

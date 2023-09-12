import { apiCosmosFetch } from "./api-cosmos-fetch";
import { BlockLatestSchema } from "./api-cosmos-block-latest";

export const apiCosmosBlockByHeight = (
  urls: Readonly<[string, ...string[]]>,
  height: bigint | number | string
) =>
  apiCosmosFetch(
    BlockLatestSchema,
    urls,
    `/cosmos/base/tendermint/v1beta1/blocks/${height.toString()}`
  );

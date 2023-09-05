import { z } from "zod";
import { CosmosAddress } from "../../wallet";
import { AmountSchema, paginateCosmosSchema } from "./validation";
import { apiCosmosFetch } from "./api-cosmos-fetch";

export const NodeInfoResponseSchema = z.object({
  default_node_info: z.object({
    protocol_version: z.object({
      p2p: z.string(),
      block: z.string(),
      app: z.string(),
    }),
    default_node_id: z.string(),
    listen_addr: z.string(),
    network: z.string(),
    version: z.string(),
    channels: z.string(),
    moniker: z.string(),
    other: z.object({ tx_index: z.string(), rpc_address: z.string() }),
  }),
  application_version: z.object({
    name: z.string(),
    app_name: z.string(),
    version: z.string(),
    git_commit: z.string(),
    build_tags: z.string(),
    go_version: z.string(),
    build_deps: z.array(
      z.object({ path: z.string(), version: z.string(), sum: z.string() })
    ),
    cosmos_sdk_version: z.string(),
  }),
});

export const apiCosmosNodeInfo = (urls: Readonly<[string, ...string[]]>) =>
  apiCosmosFetch(
    NodeInfoResponseSchema,
    urls,
    `/cosmos/base/tendermint/v1beta1/node_info`
  );

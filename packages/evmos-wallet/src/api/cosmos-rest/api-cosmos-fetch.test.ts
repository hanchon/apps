import { describe, test, expect } from "vitest";
import { apiCosmosFetch } from "./api-cosmos-fetch";
import { chains } from "@evmos-apps/registry";
import { z } from "zod";
import { E } from "helpers";

describe("apiCosmosFetch", () => {
  const evmosHttp = chains.evmos.cosmosRest[0];
  const unreachableUrl = "https://nonexistent-grpc-rest-api.com";

  const nodeInfoFetch = (http: string) =>
    apiCosmosFetch(
      z
        .object({
          application_version: z.object({}).passthrough(),
        })
        .passthrough(),
      [http],
      `/cosmos/base/tendermint/v1beta1/node_info`,
    );
  test("successful call ", async () => {
    const response = await nodeInfoFetch(evmosHttp);

    expect(response.application_version).toBeDefined();
  });

  test("apiCosmosFetch unreachable", async () => {
    const [err] = await E.try(() => nodeInfoFetch(unreachableUrl));
    console.log(err);
    expect(E.match.byPattern(err, /Failed to fetch/)).toBeTruthy();
  });
});

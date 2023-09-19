import { describe, test, expect } from "vitest";

import { chains } from "@evmos-apps/registry";
import { apiCosmosAccountByAddress } from "./api-cosmos-account-by-address";
import { E } from "helpers";

const inexistentAddress = "evmos1tlxp8pcrvdpj8wf6juwezjgrwvhcyu045jk8tq";
const existentAddress = "evmos1gxykhk5uffcrc7mqppftfrcxumqm6gz0lh8t5k";

describe("apiCosmosFetchAccountByAddress", () => {
  test("existent address", async () => {
    const chain = chains.evmos;
    const { account } = await apiCosmosAccountByAddress(
      chain.cosmosRest,
      existentAddress
    );
    expect(account).toBeDefined();
  });

  test("inexistent address", async () => {
    const chain = chains.evmos;
    const [err] = await E.try(() =>
      apiCosmosAccountByAddress(chain.cosmosRest, inexistentAddress)
    );
    expect(E.match.byPattern(err, /account .* not found/)).toBeTruthy();
  });
});

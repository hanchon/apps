import { describe, expect, it } from "vitest";

import { sleep } from "helpers/src/sleep";
import { loadRegistryChainExtensions } from "./load-registry-chain-extensions";

describe("loadRegistryChainExtensions", () => {
  it("should load local registry extensions", async () => {
    const chains = await loadRegistryChainExtensions();

    expect(chains.length).toBeGreaterThan(0);

    await sleep(1000);
  });
});

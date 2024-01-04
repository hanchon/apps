import { describe, expect, it } from "vitest";

import { fetchChains } from "./fetch-chains";
import { sleep } from "helpers/src/sleep";

describe("fetchChains", () => {
  it("should fetch chains", async () => {
    const chains = await fetchChains();

    expect(chains.length).toBeGreaterThan(0);

    await sleep(1000);
  });
});

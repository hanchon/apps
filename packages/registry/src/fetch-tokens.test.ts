import { describe, expect, it } from "vitest";

import { fetchTokens } from "./fetch-tokens";
import { sleep } from "helpers/src/sleep";

describe("fetchTokens", () => {
  it("should fetch tokens", async () => {
    const tokens = await fetchTokens();

    expect(tokens.length).toBeGreaterThan(0);

    await sleep(1000);
  });
});

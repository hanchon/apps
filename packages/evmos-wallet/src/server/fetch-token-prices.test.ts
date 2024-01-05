import { describe, test, expect } from "vitest";
import { fetchTokenPrices } from "./fetch-token-prices";

describe("fetch-token-prices", ({}) => {
  test("should fetch token prices", async ({}) => {
    const prices = await fetchTokenPrices();

    expect(prices).toBeDefined();
  });
});

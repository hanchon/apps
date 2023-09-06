import { chains } from "@evmos-apps/registry";
import { describe, expect, test } from "vitest";
import { getIBCDenomOnNetwork } from "./get-ibc-denom-on-network";
import { toIBCDenom } from "helpers";

describe("getIBCDenom", () => {
  test("should return ibc denom for evmos", () => {
    for (const { prefix, source } of Object.values(chains)) {
      if (prefix === "evmos") continue;

      console.log(prefix, [source.sourceChannel, source.destinationChannel]);
      if (prefix === "stride") continue; // Evmos IBC denom on stride is wrong in our registry
      // console.log(prefix, getIBCDenomOnNetwork(prefix, "NEOK"));
      // console.log(prefix, chains.axelar.source);
      expect(getIBCDenomOnNetwork(prefix, "EVMOS")).toBe(
        source.sourceIBCDenomToEvmos
      );
    }
  });
});

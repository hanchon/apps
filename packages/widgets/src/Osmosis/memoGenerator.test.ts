/* eslint-disable no-secrets/no-secrets */

import { expect, test } from "vitest";

import {
  AEVMOS_DENOM,
  GenerateOsmosisMemo,
  NO_OSMOSIS_FALLBACK,
  OSMOSIS_OUTPOST_CONTRACT,
  OsmosisMemoParams,
  UOSMO_DENOM,
} from "./memoGenerator";

test("valid no fallback address", () => {
  const params: OsmosisMemoParams = {
    outputDenom: UOSMO_DENOM,
    slippagePercentage: "5",
    windowSeconds: 20,
    receiver: "evmos1hp2525adxv83t2sqtts6nd0w6dtrrzx56j9mqw",
    fallbackAddress: NO_OSMOSIS_FALLBACK,
  };

  const expected = `{"wasm":{"contract":"${OSMOSIS_OUTPOST_CONTRACT}","msg":{"osmosis_swap":{"output_denom":"${params.outputDenom}","slippage":{"twap":{"slippage_percentage":"${params.slippagePercentage}","window_seconds":${params.windowSeconds}}},"receiver":"${params.receiver}","on_failed_delivery":"${params.fallbackAddress}"}}}}`;

  expect(GenerateOsmosisMemo(params)).toEqual(expected);
});

test("valid with fallback address", () => {
  const params: OsmosisMemoParams = {
    outputDenom: AEVMOS_DENOM,
    slippagePercentage: "5",
    windowSeconds: 20,
    receiver: "evmos1hp2525adxv83t2sqtts6nd0w6dtrrzx56j9mqw",
    fallbackAddress: "osmo1044qatzg4a0wm63jchrfdnn2u8nwdgxxt6e524",
  };

  const expected = `{"wasm":{"contract":"${OSMOSIS_OUTPOST_CONTRACT}","msg":{"osmosis_swap":{"output_denom":"${params.outputDenom}","slippage":{"twap":{"slippage_percentage":"${params.slippagePercentage}","window_seconds":${params.windowSeconds}}},"receiver":"${params.receiver}","on_failed_delivery":"${params.fallbackAddress}"}}}}`;
  expect(GenerateOsmosisMemo(params)).toEqual(expected);
});

test("invalid slippage (less than 0)", () => {
  const params: OsmosisMemoParams = {
    outputDenom: UOSMO_DENOM,
    slippagePercentage: "-1",
    windowSeconds: 20,
    receiver: "evmos1hp2525adxv83t2sqtts6nd0w6dtrrzx56j9mqw",
    fallbackAddress: "osmo1044qatzg4a0wm63jchrfdnn2u8nwdgxxt6e524",
  };

  expect(() => {
    GenerateOsmosisMemo(params);
  }).toThrow(RangeError);
});

test("invalid slippage (more than 20)", () => {
  const params: OsmosisMemoParams = {
    outputDenom: UOSMO_DENOM,
    slippagePercentage: "21",
    windowSeconds: 20,
    receiver: "evmos1hp2525adxv83t2sqtts6nd0w6dtrrzx56j9mqw",
    fallbackAddress: "osmo1044qatzg4a0wm63jchrfdnn2u8nwdgxxt6e524",
  };

  expect(() => {
    GenerateOsmosisMemo(params);
  }).toThrow(RangeError);
});

test("invalid windowSeconds (less than 0)", () => {
  const params: OsmosisMemoParams = {
    outputDenom: UOSMO_DENOM,
    slippagePercentage: "5",
    windowSeconds: -1,
    receiver: "evmos1hp2525adxv83t2sqtts6nd0w6dtrrzx56j9mqw",
    fallbackAddress: "osmo1044qatzg4a0wm63jchrfdnn2u8nwdgxxt6e524",
  };

  expect(() => {
    GenerateOsmosisMemo(params);
  }).toThrow(RangeError);
});

test("invalid windowSeconds (more than 60)", () => {
  const params: OsmosisMemoParams = {
    outputDenom: UOSMO_DENOM,
    slippagePercentage: "5",
    windowSeconds: 61,
    receiver: "evmos1hp2525adxv83t2sqtts6nd0w6dtrrzx56j9mqw",
    fallbackAddress: "osmo1044qatzg4a0wm63jchrfdnn2u8nwdgxxt6e524",
  };

  expect(() => {
    GenerateOsmosisMemo(params);
  }).toThrow(RangeError);
});

test("invalid denom (aevmos)", () => {
  const params: OsmosisMemoParams = {
    outputDenom: "aevmos",
    slippagePercentage: "5",
    windowSeconds: 20,
    receiver: "evmos1hp2525adxv83t2sqtts6nd0w6dtrrzx56j9mqw",
    fallbackAddress: "osmo1044qatzg4a0wm63jchrfdnn2u8nwdgxxt6e524",
  };

  expect(() => {
    GenerateOsmosisMemo(params);
  }).toThrow(TypeError);
});

test("invalid fallbackAddress (empty)", () => {
  const params: OsmosisMemoParams = {
    outputDenom: UOSMO_DENOM,
    slippagePercentage: "5",
    windowSeconds: 20,
    receiver: "evmos1hp2525adxv83t2sqtts6nd0w6dtrrzx56j9mqw",
    fallbackAddress: "",
  };

  expect(() => {
    GenerateOsmosisMemo(params);
  }).toThrow(TypeError);
});

test("invalid fallbackAddress (evmos wallet)", () => {
  const params: OsmosisMemoParams = {
    outputDenom: UOSMO_DENOM,
    slippagePercentage: "5",
    windowSeconds: 20,
    receiver: "evmos1hp2525adxv83t2sqtts6nd0w6dtrrzx56j9mqw",
    fallbackAddress: "evmos1hxse9e6vthqmjkp2da334g4mquc4qssxargrx4",
  };

  expect(() => {
    GenerateOsmosisMemo(params);
  }).toThrow(TypeError);
});

test("invalid fallbackAddress (incomplete osmos wallet -> 1 char less)", () => {
  const params: OsmosisMemoParams = {
    outputDenom: UOSMO_DENOM,
    slippagePercentage: "5",
    windowSeconds: 20,
    receiver: "evmos1hp2525adxv83t2sqtts6nd0w6dtrrzx56j9mqw",
    fallbackAddress: "osmo1zvtk39mzx5x6kze6nkmha89wf6e4ewrypsest",
  };

  expect(() => {
    GenerateOsmosisMemo(params);
  }).toThrow(TypeError);
});

/* eslint-disable no-secrets/no-secrets */

import { expect, test } from "vitest";
import { GenerateStrideMemo, STAKE_ACTION } from "./memoGenerator";

test("valid", () => {
  const sender = "evmos1q4fc7nlx67q3puck6ydury3e4ynvn3qe98khj0";
  const receiver = "stride1q4fc7nlx67q3puck6ydury3e4ynvn3qeyd89ut";
  const expected = `{"autopilot":{"receiver":"${receiver}","stakeibc":{"ibc_receiver":"${sender}","action":"${STAKE_ACTION}"}}}`;

  expect(GenerateStrideMemo(sender, receiver)).toEqual(expected);
});

test("invalid action", () => {
  const sender = "evmos1q4fc7nlx67q3puck6ydury3e4ynvn3qe98khj0";
  const receiver = "stride1q4fc7nlx67q3puck6ydury3e4ynvn3qeyd89ut";

  expect(() => {
    GenerateStrideMemo(sender, receiver, "RedeemStake");
  }).toThrow(TypeError);
});

test("invalid sender not from evmos", () => {
  const sender = "stride1q4fc7nlx67q3puck6ydury3e4ynvn3qeyd89ut";
  const receiver = "stride1q4fc7nlx67q3puck6ydury3e4ynvn3qeyd89ut";

  expect(() => {
    GenerateStrideMemo(sender, receiver);
  }).toThrow(TypeError);
});

test("invalid sender: evmos invalid address", () => {
  const sender = "evmos1q4fc7nlx67q3puck6ydury3e4ynvn3";
  const receiver = "stride1q4fc7nlx67q3puck6ydury3e4ynvn3qeyd89ut";

  expect(() => {
    GenerateStrideMemo(sender, receiver);
  }).toThrow(TypeError);
});

test("invalid receiver not from stride", () => {
  const sender = "evmos1q4fc7nlx67q3puck6ydury3e4ynvn3qe98khj0";
  const receiver = "evmos1q4fc7nlx67q3puck6ydury3e4ynvn3qe98khj0";

  expect(() => {
    GenerateStrideMemo(sender, receiver);
  }).toThrow(TypeError);
});

test("invalid receiver: stride invalid address", () => {
  const sender = "evmos1q4fc7nlx67q3puck6ydury3e4ynvn3qe98khj0";
  const receiver = "stride1q4fc7nlx67q3puck6ydury3e4ynvn3qeyd89ut1111111111";

  expect(() => {
    GenerateStrideMemo(sender, receiver);
  }).toThrow(TypeError);
});

"use server";

import { nextCache } from "helpers/src/next/cache";
import { seconds } from "helpers/src/time";
import { TokenDenom } from "../../../../../autogen/registry";
import { fetchTokens } from "../fetch-tokens";
import { raise } from "helpers";

export const fetchTokenByDenom = nextCache(
  async function (denom: TokenDenom | (string & {})) {
    return (
      (await fetchTokens()).find((token) => token.coinDenom === denom) ??
      raise("Token not found")
    );
  },
  ["fetchTokens"],
  {
    revalidate: seconds("1d"),
  }
);

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import createClient from "openapi-fetch";
import { paths } from "./cosmos-client";
export const ENV_URL =
  process.env.VERCEL_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  typeof window === "undefined"
    ? `http://localhost:${process.env.PORT}`
    : "";

export const cosmos = (
  chain: string,
  config: {
    baseUrl?: string;
    fetch?: typeof fetch;
  } = {},
) =>
  createClient<paths>({
    baseUrl: ENV_URL + `/api/cosmos-rest/${chain}/`,
    fetch,
    ...config,
  });

export type CosmosClientPaths = paths;

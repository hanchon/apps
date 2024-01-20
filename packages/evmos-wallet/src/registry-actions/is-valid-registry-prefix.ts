// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { prefixes } from "./get-prefixes";

export const isValidRegistryPrefix = (prefix: unknown): prefix is string =>
  prefixes.has(prefix as string);

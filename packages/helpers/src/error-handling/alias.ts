// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { matchError } from "./matchers";
import { raise } from "./assertions";
import { tryCatch } from "./tryCatch";
import { ensureError } from "./normalizeError";

export const E = {
  try: tryCatch,
  raise,
  match: matchError,
  ensureError,
};

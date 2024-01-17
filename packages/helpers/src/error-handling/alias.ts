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

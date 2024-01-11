import path from "path";
import { fileURLToPath } from "node:url";

export const cacheDir = path.join(
  fileURLToPath(import.meta.url),
  "../../../../../node_modules/.cache/evmosapps"
);

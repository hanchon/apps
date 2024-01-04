import path from "path";
import { fileURLToPath } from "node:url";

export const extendRegistryDir = path.join(
  fileURLToPath(import.meta.url),
  "../extend-registry"
);

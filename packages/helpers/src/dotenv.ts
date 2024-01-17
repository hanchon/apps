import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import path from "path";

const dir = fileURLToPath(import.meta.url);
const repoRoot = path.join(dir, "../../../../");

config({
  path: path.join(repoRoot, ".vercel/.env.development.local"),
  override: true,
});
config({
  path: path.join(repoRoot, ".env"),
  override: true,
});

export const ensureKeys = (keys: string[]) => {
  keys.forEach((key) => {
    if (!process.env[key])
      throw new Error(
        `'${key}' not defined. Ensure to set it in your .env file`
      );
  });
};

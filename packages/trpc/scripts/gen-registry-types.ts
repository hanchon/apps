import { ensureKeys } from "helpers/src/dotenv";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { fetchChains } from "../src/procedures/chains/queries/server";

import { fileURLToPath } from "node:url";
import { fetchTokens } from "../src/procedures/tokens/queries/server";

ensureKeys(["GITHUB_TOKEN"]);

export const autogenDir = path.join(
  fileURLToPath(import.meta.url),
  "../../autogen"
);

const types: string[] = [`/* eslint-disable */`];

const genUnion = (name: string, union: string[]) => {
  types.push(
    `export type ${name} = ${union
      .map((value) => JSON.stringify(value))
      .join("\n  | ")};\n`
  );
};

const genChainTypes = async () => {
  const chains = await fetchChains();
  const chainPrefixes = chains.map((chain) => chain.prefix);

  genUnion("ChainPrefix", chainPrefixes);

  const chainRefs = chains.map((chain) => chain.ref);

  genUnion("ChainRef", chainRefs);
};

const genTokenTypes = async () => {
  const tokens = await fetchTokens();
  const tokenSymbols = tokens.map((token) => token.coinDenom);

  genUnion("TokenDenom", tokenSymbols);
};

await genChainTypes();
await genTokenTypes();
await mkdir(autogenDir, {
  recursive: true,
});
await writeFile(path.join(autogenDir, "registry.ts"), types.join("\n"));

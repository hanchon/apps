import { chainRegistryDir, tokenRegistryDir } from "./constants.ts";
import { validateChain, validateToken } from "./validation.ts";
import { readdir } from "fs/promises";
import { ChainRegistry, TokenRegistry } from "./types.ts";

export const loadChainDir = async () => {
  let registryFiles = await readdir(chainRegistryDir);

  registryFiles = registryFiles.filter((filename) =>
    filename.endsWith(".json")
  );

  const chains = await Promise.all(
    registryFiles.map(async (filename) => {
      const { default: chain } = (await import(
        `chain-token-registry/chainConfig/${filename}`,
        {
          assert: { type: "json" },
        }
      )) as { default: unknown };

      if (!validateChain(chain)) {
        throw new Error(
          `Invalid chain config: ${filename}\n${JSON.stringify(
            validateChain.errors,
            null,
            2
          )}`
        );
      }
      return chain;
    })
  );

  return chains.reduce<Record<string, ChainRegistry>>((acc, chain) => {
    acc[chain.prefix] = chain;
    return acc;
  }, {});
};

export const loadTokensDir = async () => {
  let registryFiles = await readdir(tokenRegistryDir);

  registryFiles = registryFiles.filter((filename) =>
    filename.endsWith(".json")
  );

  const tokens = await Promise.all(
    registryFiles.map(async (filename) => {
      const { default: token } = (await import(
        `chain-token-registry/tokens/${filename}`,
        {
          assert: { type: "json" },
        }
      )) as { default: unknown };

      if (!validateToken(token)) {
        throw new Error(
          `Invalid Token config: ${filename}\n${JSON.stringify(
            validateToken.errors,
            null,
            2
          )}`
        );
      }
      return token;
    })
  );
  return tokens.reduce<Record<string, TokenRegistry>>((acc, token) => {
    acc[token.coinDenom] = token;
    return acc;
  }, {});
};

export const chainRegistry = await loadChainDir();
export const tokenRegistry = await loadTokensDir();

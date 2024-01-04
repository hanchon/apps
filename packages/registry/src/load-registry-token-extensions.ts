import { readdir, readFile } from "fs/promises";
import path from "path";
import { TokenEntity } from "../autogen/token-entity";
import { extendRegistryDir } from "./constants";

export const loadRegistryTokenExtensions = async () => {
  const chainExtensions = await readdir(path.join(extendRegistryDir, "tokens"));
  return Promise.all(
    chainExtensions.map(async (chainExtension) => {
      const chainExtensionPath = path.join(
        extendRegistryDir,
        "tokens",
        chainExtension
      );

      const chainExtensionContent = await readFile(chainExtensionPath, "utf8");

      return JSON.parse(chainExtensionContent) as TokenEntity;
    })
  );
};

import { readdir, readFile } from "fs/promises";
import path from "path";
import { ChainEntity } from "../autogen/chain-entity";
import { extendRegistryDir } from "./constants";
export const loadRegistryChainExtensions = async () => {
  const chainExtensions = await readdir(path.join(extendRegistryDir, "chains"));
  return Promise.all(
    chainExtensions.map(async (chainExtension) => {
      const chainExtensionPath = path.join(
        extendRegistryDir,
        "chains",
        chainExtension
      );

      const chainExtensionContent = await readFile(chainExtensionPath, "utf8");

      return JSON.parse(chainExtensionContent) as ChainEntity;
    })
  );
};

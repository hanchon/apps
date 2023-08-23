import { mkdir } from "fs/promises";

import {
  assetsDir,
  chainOutDir,
  fileHeader,
} from "./chain-from-registry/constants.ts";
import path from "path";
import { writeFile } from "fs/promises";
import { logger } from "./chain-from-registry/log.ts";
import { generateChainConfigs } from "./chain-from-registry/generate-chain-configs.ts";

logger.info("registry", "Creating output directories if they don't exist");
await mkdir(assetsDir, { recursive: true });
await mkdir(chainOutDir, { recursive: true });

logger.info("registry", "Generating chain configs");
const configs = await generateChainConfigs();

const saveFiles = async () => {
  return Promise.all(
    Object.entries(configs).map(([chainName, config]) => {
      logger.info(chainName, `Writing chain config file for ${chainName}`);
      const filePath = path.resolve(chainOutDir, `${chainName}.ts`);
      const content = `${fileHeader}export default ${JSON.stringify(
        config,
        null,
        2
      )} as const;`;
      return writeFile(filePath, content);
    })
  );
};

const saveBarrelFile = async () => {
  logger.info("registry", "Writing barrel file");
  const filePath = path.resolve(chainOutDir, "index.ts");
  let content = fileHeader;
  for (const [chainName] of Object.entries(configs)) {
    content += `export { default as ${chainName} } from "./${chainName}";\n`;
  }
  return writeFile(filePath, content);
};
await saveFiles();
await saveBarrelFile();

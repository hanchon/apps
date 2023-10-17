import { Config } from "../cosmos/cosmos-config";
import { createCommandClient } from "./command-client";

export const getChainClient = (config: Config) =>
  createCommandClient(config.chainName, [
    "--home",
    config.homeDir,
    "--log_format",
    "json",
  ]);

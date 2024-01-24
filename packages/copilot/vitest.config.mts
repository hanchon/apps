import { defineConfig, mergeConfig } from "vitest/config";
import sharedConfig from "@evmosapps/config/vitest/base.js";

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      setupFiles: ["vitest.setup.ts"],
    },
  })
);

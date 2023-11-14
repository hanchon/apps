// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { withEvmosConfig } from "@evmosapps/config/next/with-config.js";

export default withEvmosConfig({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod-files-secure.*.amazonaws.com",
      },
    ],
  },
});

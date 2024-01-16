// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { withEvmosConfig } from "@evmosapps/config/next/with-config.js";
import locale from "./next-i18next.config.js";

export default withEvmosConfig({
  i18n: locale.i18n,

  async rewrites() {
    console.log(
      "building redirects",
      process.env.VERCEL_ENV,
      process.env.VERCEL
    );
    if (process.env.VERCEL !== "1") {
      return {};
    }
    const suffix = process.env.VERCEL_ENV === "production" ? "" : "-staging";
    const redirects = ["portfolio", "staking", "governance"].flatMap((app) => {
      const destination = `https://evmos-${app + suffix}.vercel.app/portfolio`;
      return [
        {
          source: `/${app}`,
          destination,
        },
        {
          source: `/${app}/:path*`,
          destination: `${destination}/:path*`,
        },
      ];
    });
    console.log("redirects", redirects);
    return { beforeFiles: redirects };
  },
});

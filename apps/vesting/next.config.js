// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
const { version } = require("./package.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["storage.evmos.org"],
  },
  reactStrictMode: true,
  basePath: "/vesting",
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  publicRuntimeConfig: {
    version,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
import { readFile } from "fs/promises";
import bundleAnalyzer from "@next/bundle-analyzer";
/**
 * @type {{
 *   name:string,
 *   version?:string,
 *   devDependencies?:Record<string,string>,
 *   dependencies?:Record<string,string>,
 *   peerDependencies?:Record<string,string>,
 * }}
 **/
const modulePackageJson = JSON.parse(
  await readFile(`${process.cwd()}/package.json`, "utf-8")
);

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE_NEXT_BUNDLE === "true",
});

/** @type {(config?:import('next').NextConfig) => import('next').NextConfig} */
export function withEvmosConfig(config = {}) {
  const transpilePackages = Object.entries(
    Object.assign(
      {},
      modulePackageJson.dependencies,
      modulePackageJson.devDependencies,
      modulePackageJson.peerDependencies
    )
  ).reduce((acc, [key, value]) => {
    if (value.startsWith("workspace:")) {
      acc.add(key);
    }
    return acc;
  }, new Set());
  transpilePackages.delete("@evmos-apps/config");
  transpilePackages.delete("tailwind-config");
  transpilePackages.delete("playwright-config-custom");

  return withBundleAnalyzer({
    images: {
      domains: ["storage.evmos.org"],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    publicRuntimeConfig: {
      version: modulePackageJson.version,
    },
    transpilePackages: [...transpilePackages],
    ...config,
  });
}

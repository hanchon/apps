// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";
import { github } from "helpers/src/clients/github";
import { isString } from "helpers";
// https://api.github.com/repos/evmos/chain-token-registry/contents/tokens%2FBERLIN.json
export const fetchChainRegistryDir = async <T>(dir: string) => {
  const { data } = await github.rest.repos.getContent({
    owner: "evmos",
    repo: "chain-token-registry",
    path: dir,
    ref: process.env.CHAIN_REGISTRY_REF,
    mediaType: {
      format: "json",
    },
  });
  if (!Array.isArray(data)) {
    throw new Error("Expected array");
  }

  const result = await Promise.all(
    data.flatMap((file) => {
      if (file.type !== "file" || !file.name.endsWith(".json")) {
        return [];
      }

      return [
        github.rest.repos
          .getContent({
            owner: "evmos",
            repo: "chain-token-registry",
            path: file.path,
            ref: process.env.CHAIN_REGISTRY_REF,
            mediaType: {
              format: "raw",
            },
          })
          .then(({ data }) => {
            if (!isString(data)) throw new Error("Expected string");

            return JSON.parse(data) as T;
          }),
      ];
    }),
  );

  return result as T[];
};

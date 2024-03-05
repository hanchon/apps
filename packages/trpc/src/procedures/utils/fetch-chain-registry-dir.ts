// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";
import { github } from "helpers/src/clients/github";
import { isString } from "helpers";

export const fetchChainRegistryDir = async <T>(dir: string) => {
  const owner = "evmos";
  const repo = "chain-token-registry";
  const path = dir;
  const ref = process.env.CHAIN_REGISTRY_REF ?? "main";
  const dataValues = await fetch(
    // TODO: move the endpoint to a env var
    "https://proxy.evmos.org/github/" +
      "repos/" +
      owner +
      "/" +
      repo +
      "/contents/" +
      path +
      "?ref=" +
      ref,
  );

  const data = (await dataValues.json()) as {
    type: "dir" | "file" | "submodule" | "symlink";
    path: string;
    name: string;
  }[];

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
            ref: process.env.CHAIN_REGISTRY_REF ?? "main",
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

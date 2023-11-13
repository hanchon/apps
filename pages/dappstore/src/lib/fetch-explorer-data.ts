import { raise } from "helpers";
import slugify from "slugify";
import { omit } from "lodash";
import { cache } from "react";
import path from "path";
import { fetchCategories, fetchDapps } from "./fetch-categories";
import fs from "fs/promises";

export const fetchExplorerData = cache(async () => {
  const categoriesMap = await fetchCategories();
  const dappsMap = await fetchDapps();

  const categories = [];
  const dApps = [];
  for (const {
    displayName,
    name,
    projects,
    ...rest
  } of categoriesMap.values()) {
    const categorySlug = slugify(name, { lower: true, strict: true });
    const categoryName = displayName || name;

    const categoryDapps: string[] = [];
    for (const projectId of projects) {
      const { name, ...rest } =
        dappsMap.get(projectId) ?? raise("Project not found");

      const dappSlug = slugify(name, { lower: true, strict: true });
      dApps.push({
        name: name,
        slug: dappSlug,
        categorySlug,
        categoryName,
        ...rest,
      });

      categoryDapps.push(dappSlug);
    }
    const category = {
      name: categoryName,
      slug: categorySlug,
      categoryDapps,
      ...rest,
    };
    categories.push(category);
  }

  return {
    categories,
    dApps,
  };
});

export type Category = Awaited<
  ReturnType<typeof fetchExplorerData>
>["categories"][number];
export type DApp = Awaited<
  ReturnType<typeof fetchExplorerData>
>["dApps"][number];

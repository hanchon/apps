import { raise } from "helpers";
import slugify from "slugify";

import { cache } from "react";

import { fetchDapps } from "./fetch-dapps";
import { fetchCategories } from "./fetch-categories";

export const fetchExplorerData = cache(async () => {
  const categoriesMap = await fetchCategories();
  const dappsMap = await fetchDapps();

  const categories = [];
  const dApps = [];
  for (const { name, projects, ...rest } of categoriesMap.values()) {
    const categorySlug = slugify(name, { lower: true, strict: true });
    const categoryName = name;

    const categoryDapps: string[] = [];
    for (const projectId of projects) {
      const { name, ...rest } =
        dappsMap.get(projectId) ?? raise("Project not found");

      dApps.push({
        name: name,

        categorySlug,
        categoryName,
        ...rest,
      });

      categoryDapps.push(rest.slug);
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

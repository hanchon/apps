import { raise } from "helpers";
import slugify from "slugify";
import { omit } from "lodash";
import { cache } from "react";
import path from "path";
import { fetchCategories, fetchDapps } from "./fetch-categories";
import fs from "fs/promises";

const notionCache = <Args extends any[], Res>(
  fn: (...args: Args) => Promise<Res>
) => {
  if (process.env.NODE_ENV === "development") {
    return cache(async (...args: Args): Promise<Res> => {
      const time = performance.now();
      const cachePath = path.join(process.cwd(), ".notion-cache", fn.name);
      try {
        await fs.mkdir(path.dirname(cachePath), { recursive: true });
      } catch (e) {}
      try {
        const cached = await fs.readFile(cachePath, "utf-8");

        const res = JSON.parse(cached);

        console.log("CACHE HIT", fn.name, performance.now() - time);
        return res as Res;
      } catch (error) {
        const result = await fn(...args);
        await fs.writeFile(cachePath, JSON.stringify(result));
        return result as Res;
      }
    });
  }

  return cache(fn);
};

export const fetchExplorerData = notionCache(async () => {
  const categoriesMap = await fetchCategories();
  const dappsMap = await fetchDapps();

  const categories = [];
  const dApps = [];
  for (const {
    displayName,
    name,
    projectNotionIds,
    ...rest
  } of categoriesMap.values()) {
    const categorySlug = slugify(name, { lower: true, strict: true });
    const categoryName = displayName || name;

    const categoryDapps: string[] = [];
    for (const projectId of projectNotionIds) {
      const { name, displayName, ...rest } =
        dappsMap.get(projectId) ?? raise("Project not found");

      const dappSlug = slugify(name, { lower: true, strict: true });
      dApps.push({
        name: displayName || name,
        slug: dappSlug,
        categorySlug,
        categoryName,
        ...omit(rest, ["subItemNotionIds", "notionId"]),
      });

      categoryDapps.push(dappSlug);
    }
    const category = {
      name: categoryName,
      slug: categorySlug,
      categoryDapps,
      ...omit(rest, ["notionId", "subItemNotionIds"]),
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

"use server";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fetchExplorerData } from "../../lib/fetch-explorer-data";
import { EcosystemCard } from "../landing/partials/ecosystem-card";
import { HeaderCategories } from "./partials/header-categories";

export const DappExplorerPage = async ({
  params,
}: {
  params: { category?: string };
}) => {
  const { dApps, categories } = await fetchExplorerData();
  // TODO: create a function and test it

  const filteredDapps = dApps.filter((dapp) => {
    if (params.category === "instant-dapps") {
      return dapp.isInstantDapp;
    }
    return dapp.categorySlug === params.category;
  });

  const sortedApps = params.category
    ? filteredDapps.sort((a, b) =>
        a.categorySlug !== b.categorySlug
          ? // show instant dapps first
            a.isInstantDapp
            ? -1
            : 1
          : // sort by name
          a.name > b.name
          ? 1
          : -1
      )
    : dApps;

  return (
    <>
      <HeaderCategories
        dApps={dApps}
        amountAppsSelected={sortedApps?.length ?? 0}
        categories={[
          {
            categoryDapps: sortedApps
              .filter(({ isInstantDapp: instantDapp }) => instantDapp)
              .map(({ slug }) => slug),

            description:
              "Instant dApps are dApps that are already deployed on Evmos and can be used instantly.",
            name: "Instant dApps",
            slug: "instant-dapps",
          },
          ...categories,
        ]}
        params={params}
      />
      <div className="grid gap-x-8 md:grid-cols-4 pt-20">
        {sortedApps?.map((dApp) => (
          <EcosystemCard data={dApp} key={dApp.name} />
        ))}
      </div>
    </>
  );
};

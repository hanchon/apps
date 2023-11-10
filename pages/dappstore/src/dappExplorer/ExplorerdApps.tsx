"use server";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { categories, dApps } from "../data";
import { EcosystemCard } from "../dappStore/ecosystem/Card";
import { HeaderCategories } from "../dappStore/categories/Header";

export const ExplorerdApps = ({ params }: { params: { category: string } }) => {
  // TODO: create a function and test it
  const sortedApps = dApps
    .filter((dapp) => dapp.categorySlug === params.category)
    .sort((a, b) =>
      a.type !== b.type
        ? // show instant dapps first
          a.type === "Instant dApps"
          ? -1
          : 1
        : // sort by name
        a.name > b.name
        ? 1
        : -1
    );

  return (
    <>
      <HeaderCategories
        apps={dApps}
        amountAppsSelected={sortedApps?.length ?? 0}
        categories={categories}
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

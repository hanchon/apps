// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { notFound, redirect } from "next/navigation";
import { fetchExplorerData } from "../../../lib/fetch-explorer-data";
import { DescriptiondApp } from "../partials/description-section";

export const DappDetailsPage = async ({
  params,
}: {
  params: {
    dapp: string;
    category: string;
    locale: string;
  };
}) => {
  const { dApps } = await fetchExplorerData();

  const dapp = dApps.find((dApp) => dApp.slug === params.dapp);

  if (!dapp) {
    notFound();
  }
  if (params.category !== dapp.categorySlug) {
    redirect(`/${params.locale}/dapps/${dapp.categorySlug}/${params.dapp}`);
  }

  return <DescriptiondApp dapp={dapp} />;
};

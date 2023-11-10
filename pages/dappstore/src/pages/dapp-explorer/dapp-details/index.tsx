import { notFound, redirect } from "next/navigation";
import { fetchExplorerData } from "../../../lib/fetch-explorer-data";

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
  return (
    <div>
      <h1>{dapp.name}</h1>
      <p>{dapp.description}</p>
      <pre>
        <code>{JSON.stringify(dapp, null, 2)}</code>
      </pre>
    </div>
  );
};

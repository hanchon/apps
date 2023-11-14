"use server";
import { Breadcrumb } from "@evmosapps/ui-helpers";
import { fetchExplorerData } from "../../lib/fetch-explorer-data";

export const AppsExplorerLayout = async ({
  children,
  params,
}: React.PropsWithChildren<{
  params: { category?: string; dapp?: string };
}>) => {
  const pages = [
    {
      name: "dApp Store",
      href: "/",
      current: false,
    },
  ];
  const { categories, dApps } = await fetchExplorerData();
  const category = params.category
    ? categories.find((c) => c.slug === params.category)
    : undefined;

  if (category) {
    pages.push({
      name: category.name,
      href: `/dapps/${category.slug}`,
      current: false,
    });
  } else if (params.category === "instant-dapps") {
    pages.push({
      name: "Instant dApps",
      href: "/dapps/instant-dapps",
      current: false,
    });
  } else {
    pages.push({
      name: "All",
      href: "/dapps",
      current: true,
    });
  }

  const dapp = params.dapp
    ? dApps.find((d) => d.slug === params.dapp)
    : undefined;

  if (dapp) {
    pages.push({
      name: dapp.name,
      href: `/dapps/${category?.slug}/${dapp.slug}`,
      current: false,
    });
  }
  const last = pages.at(-1);
  if (last) {
    last.current = true;
  }
  return (
    <div className="flex flex-col space-y-8">
      <Breadcrumb pages={pages} />
      {children}
    </div>
  );
};

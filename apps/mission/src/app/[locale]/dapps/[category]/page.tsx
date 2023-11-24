import { fetchExplorerData } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";
import { raise } from "helpers";

export { DappExplorerPage as default } from "@evmosapps/dappstore-page";

export const generateStaticParams = async () => {
  const { categories } = await fetchExplorerData();

  return [
    {
      category: "instant-dapps",
    },
    ...categories.map((category) => ({
      category: category.slug,
    })),
  ];
};
export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  const { categories } = await fetchExplorerData();
  if (params.category === "instant-dapps") {
    return {
      title: `Instant dApps | Evmos dApp Store`,
    };
  }
  const category =
    categories.find((c) => c.slug === params.category) ??
    raise(`category not found: ${params.category}`);

  return {
    title: `${category.name} dApps | Evmos dApp Store`,
  };
}

"use server";
import { Badge } from "ui-helpers";
import { Title } from "ui-helpers/src/titles/Title";
import { Subtitle } from "ui-helpers/src/titles/Subtitle";
import { categories, pages, dApps } from "../data";
import { EcosystemCard } from "../dappStore/ecosystem/Card";
import { Link } from "@evmosapps/i18n/client";
import { cn } from "helpers";

export const ExplorerdApps = ({ params }: { params: { category: string } }) => {
  // TODO: add the correct categories to the type
  const filteredApps = dApps.filter(
    (dapp) => dapp.categorySlug === params.category
  );

  return (
    <>
      <div className="flex space-y-2 flex-col">
        <Title>
          Explore the{" "}
          <span className="font-bold">{filteredApps?.length} dApps</span> on
          Evmos
        </Title>
        <Subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </Subtitle>
      </div>
      <div className="flex gap-5 flex-wrap">
        {categories.map((category) => (
          <Link href={`/dapps/${category.slug}`} key={category.slug}>
            <Badge
              className={cn({
                // TODO:  create reusable component for circle
                "bg-[#FFF4E14D] pl-9 relative before:content-[''] before:absolute before:top-[50%] before:left-3 before:-translate-y-1/2 before:w-[15px] before:h-[15px] before:bg-red-300 before:rounded-full":
                  params.category === category.slug,
              })}
              variant="dark"
            >
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>

      <div className="grid gap-x-8 md:grid-cols-4">
        {filteredApps?.map((dApp) => (
          <EcosystemCard data={dApp} key={dApp.name} />
        ))}
      </div>
    </>
  );
};

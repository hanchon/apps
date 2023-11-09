"use client";
import { Badge, Breadcrumb } from "ui-helpers";
import { Title } from "ui-helpers/src/titles/Title";
import { Subtitle } from "ui-helpers/src/titles/Subtitle";
import { categories, pages, dApps } from "./data";
import { useMemo, useState } from "react";
import { EcosystemCard } from "../dappStore/ecosystem/Card";

export const ExplorerdApps = () => {
  // TODO: add the correct categories to the type
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);

  const filteredApps = useMemo(() => {
    if (!selectedCategory) {
      return dApps;
    }
    return dApps.filter((dapp) => dapp.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex flex-col space-y-8">
      <Breadcrumb pages={pages} />
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
          <Badge
            onClick={() => {
              setSelectedCategory(category.name);
            }}
            className={`${
              selectedCategory === category.name
                ? // TODO:  create reusable component for circle
                  "bg-[#FFF4E14D] pl-9 relative before:content-[''] before:absolute before:top-[50%] before:left-3 before:-translate-y-1/2 before:w-[15px] before:h-[15px] before:bg-red-300 before:rounded-full "
                : ""
            }`}
            key={category.name}
            variant="dark"
          >
            {category.name}
          </Badge>
        ))}
      </div>

      <div className="grid gap-x-8 md:grid-cols-4">
        {filteredApps?.map((dApp) => (
          <EcosystemCard data={dApp} key={dApp.name} />
        ))}
      </div>
    </div>
  );
};

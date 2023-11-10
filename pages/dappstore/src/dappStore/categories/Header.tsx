"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useMemo, useState } from "react";
import { Link } from "@evmosapps/i18n/client";
import { cn } from "helpers";
import { Badge } from "ui-helpers";
import { Title } from "ui-helpers/src/titles/Title";
import { Subtitle } from "ui-helpers/src/titles/Subtitle";

export const HeaderCategories = ({
  apps,
  amountAppsSelected,
  categories,
  params,
}: {
  apps: {
    slug: string;
    categorySlug: string;
    image: string;
    name: string;
    type: string;
    description: string;
    href: string;
    category: string;
  }[];
  amountAppsSelected: number;
  categories: {
    slug: string;
    name: string;
  }[];
  params: { category: string };
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<null | string>(null);

  const handleCategoryHover = (category: string | null) => {
    setHoveredCategory(category);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
  };

  const amountAppsHovered = useMemo(() => {
    return apps.filter((app) => app.category === hoveredCategory).length;
  }, [hoveredCategory, apps]);

  return (
    <>
      <div className="flex space-y-2 flex-col">
        <Title>
          Explore the{" "}
          <span className="font-bold">
            {/* TODO: add correct styling for params.category  */}
            {hoveredCategory !== null
              ? ` ${amountAppsHovered} ${hoveredCategory} `
              : `${amountAppsSelected} ${params.category} `}
          </span>
          on Evmos
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
              onMouseEnter={() => handleCategoryHover(category.name)}
              onMouseLeave={handleCategoryLeave}
            >
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>
    </>
  );
};

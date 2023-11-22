"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps, ComponentRef, useMemo, useRef } from "react";
import { Link, useTranslation } from "@evmosapps/i18n/client";
import { cn } from "helpers";
import { Badge } from "@evmosapps/ui-helpers";
import { Title } from "@evmosapps/ui-helpers/src/titles/Title";
import { Subtitle } from "@evmosapps/ui-helpers/src/titles/Subtitle";
import { Category, DApp } from "../../../lib/fetch-explorer-data";
import { Trans } from "react-i18next";
export const HeaderCategories = ({
  categories,
  params,
}: {
  dApps: DApp[];
  amountAppsSelected: number;
  categories: Pick<
    Category,
    "categoryDapps" | "name" | "slug" | "description"
  >[];
  params: { category?: string };
}) => {
  const selectedCategory = useMemo(() => {
    return categories.find((category) => category.slug === params.category);
  }, [categories, params.category]);

  const totalAmountdApps = useMemo(() => {
    return categories.reduce((acc, category) => {
      if (category.slug === "instant-dapps") {
        return acc;
      }
      return acc + category.categoryDapps.length;
    }, 0);
  }, [categories]);

  const categoryName = selectedCategory?.name ?? "dApps";
  const ref = useRef<ComponentRef<"div">>(null);
  const computedStyles = ref.current ? getComputedStyle(ref.current) : null;
  const subtitleLineClamp = ref.current
    ? Math.round(
        parseFloat(computedStyles?.height ?? "1") /
          parseFloat(computedStyles?.lineHeight ?? "1")
      )
    : undefined;

  return (
    <>
      <div className="flex flex-col relative">
        <CategoryHeader
          category={selectedCategory}
          totalCategoryCount={totalAmountdApps}
        />
      </div>
      <div className="flex gap-3 md:gap-4 flex-wrap">
        {categories.map((category) => (
          <Link
            href={
              category.slug === params.category
                ? "/dapps"
                : `/dapps/${category.slug}`
            }
            key={category.slug}
          >
            <Badge
              className={cn({
                // TODO:  create reusable component for circle
                " pl-9 lg:pl-10 relative before:content-[''] before:absolute before:top-[50%] before:left-3 lg:before:left-[0.9rem] before:-translate-y-1/2 before:w-[15px] before:h-[15px] before:bg-red-300 before:rounded-full":
                  params.category === category.slug,
              })}
              variant="dark"
            >
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>
    </>
  );
};

const CategoryHeader = ({
  category,
  totalCategoryCount,
  ...rest
}: {
  category?: Pick<Category, "categoryDapps" | "name" | "slug" | "description">;
  totalCategoryCount: number;
} & ComponentProps<"div">) => {
  const { t } = useTranslation("dappStore");
  const categoryName = category?.name ?? "dApps";

  return (
    <div {...rest}>
      <Title>
        <Trans
          shouldUnescape={true}
          t={t}
          i18nKey="categories.title"
          components={{
            b: <strong className="font-bold" />,
          }}
          values={{
            name: categoryName.endsWith("dApps")
              ? categoryName
              : `${categoryName} dApps`,

            count: category?.categoryDapps.length ?? totalCategoryCount,
          }}
        />
      </Title>
      {category?.description && (
        <div className="relative text-xl text-[#E8DFD3]">
          <Subtitle>{category?.description}</Subtitle>
        </div>
      )}
    </div>
  );
};

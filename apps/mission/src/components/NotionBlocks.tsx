import { get } from "lodash-es";
import {
  BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  ListBlockChildrenResponse,
  NumberedListItemBlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import React, { ComponentProps, cache } from "react";
import Image from "next/image";
import { Client } from "@notionhq/client";
import { cn } from "helpers";
import { notFound } from "next/navigation";
export const notion = new Client({ auth: process.env.NOTION_API_KEY });
export const RichText = ({ annotations, plain_text }: RichTextItemResponse) => {
  return (
    <span
      className={cn({
        "font-bold": annotations.bold,
        italic: annotations.italic,
        underline: annotations.underline,
        "line-through": annotations.strikethrough,
        "font-mono": annotations.code,
      })}
    >
      {plain_text}
    </span>
  );
};

type Group<T extends { type: string }> = Readonly<{
  groupType: T["type"];
  children: T[];
}>;

const retrievePage = cache(
  async (pageId: string) =>
    await notion.pages.retrieve({
      page_id: pageId,
    })
);
export const NotionPage = async ({
  blockId,
  className,
  ...rest
}: { blockId: string } & ComponentProps<"div">) => {
  const page = await retrievePage(blockId);

  if (!("properties" in page)) {
    notFound();
  }
  const properties = page.properties;

  if (!("title" in properties)) {
    notFound();
  }
  const title = properties.title as Extract<
    typeof properties.title,
    { type: "title" }
  >;

  return (
    <div className={cn("prose dark:prose-invert", className)} {...rest}>
      <h1>
        {title.title.map((text, i) => (
          <RichText {...text} key={i} />
        ))}
      </h1>
      <NotionBlocks blockId={page.id} />
    </div>
  );
};

const retrieveBlockList = cache(
  async (blockId: string, cursor?: string) =>
    await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    })
);
export const NotionBlocks = async ({ blockId }: { blockId: string }) => {
  const results: ListBlockChildrenResponse["results"] = [];
  let cursor: string | undefined = undefined;
  while (true) {
    const data = await retrieveBlockList(blockId, cursor);

    results.push(...data.results);
    cursor = data.next_cursor || undefined;

    if (!data.has_more) {
      break;
    }
  }

  return <NotionBlocksRenderer blocks={results} />;
};
const NotionBlocksRenderer = ({
  blocks,
}: {
  blocks: ListBlockChildrenResponse["results"];
}) => {
  const groupped = blocks.reduce<
    (
      | BlockObjectResponse
      | Group<
          | NumberedListItemBlockObjectResponse
          | BulletedListItemBlockObjectResponse
        >
    )[]
  >((acc, block) => {
    if (!("type" in block)) {
      return acc;
    }

    if (
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item"
    ) {
      const prev = acc.at(-1);
      if (prev && "groupType" in prev && prev.groupType === block.type) {
        prev.children.push(block);
        return acc;
      }
      acc.push({
        groupType: block.type,
        children: [block],
      });
      return acc;
    }

    acc.push(block);

    return acc;
  }, []);

  return groupped.map((block, i) => {
    if ("groupType" in block) {
      return React.createElement(
        block.groupType === "bulleted_list_item" ? "ul" : "ol",
        {},
        block.children.map((block, i) => {
          return <Block key={i} block={block} />;
        })
      );
    }

    return <Block block={block} />;
  });
};
const Block = ({ block }: { block: BlockObjectResponse }) => {
  if (!("type" in block)) {
    return null;
  }
  if (block.has_children) {
    return <NotionBlocks blockId={block.id} />;
  }
  const richText = get(
    block,
    `${block.type}.rich_text`,
    []
  ) as Array<RichTextItemResponse>;
  const tag = tagmap[block.type as keyof typeof tagmap];
  if (tag)
    return React.createElement(
      tag,
      {},
      richText.map((richText, i) => <RichText key={i} {...richText} />)
    );

  if (block.type === "image") {
    if (block.image.type === "file") {
      return (
        <div className="relative h-96">
          <Image
            className="my-0 object-cover"
            src={block.image.file.url}
            alt={block.image.caption
              .map(({ plain_text }) => plain_text)
              .join(" ")}
            fill={true}
          />
        </div>
      );
    }
  }

  return null;
};
const tagmap = {
  paragraph: "p",
  heading_1: "h1",
  heading_2: "h2",
  heading_3: "h3",
  bulleted_list_item: "li",
  numbered_list_item: "li",
} as const;

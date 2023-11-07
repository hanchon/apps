import { Header } from "../../components/header/Header";
import { version } from "../../../package.json";
import { Footer } from "../../components/footer/Footer";
import { NotionRenderer } from "react-notion";
import { Client } from "@notionhq/client";
import { cn } from "helpers";
import {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { ComponentProps } from "react";
// import { NotionRenderer } from "react-notion-x";
const notion = new Client({ auth: process.env.NOTION_API_KEY });

const NotionElement = ({
  block,
  ...rest
}: { block: BlockObjectResponse } & ComponentProps<"div">) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p {...rest}>
          {block.paragraph.rich_text.map((props, i) => (
            <RichText {...props} key={i} />
          ))}
        </p>
      );
    case "heading_1":
      return (
        <h1 {...rest}>
          {block.heading_1.rich_text.map((props, i) => (
            <RichText {...props} key={i} />
          ))}
        </h1>
      );
    case "heading_2":
      return (
        <h2 {...rest}>
          {block.heading_2.rich_text.map((props, i) => (
            <RichText {...props} key={i} />
          ))}
        </h2>
      );
    case "heading_3":
      return (
        <h3 {...rest}>
          {block.heading_3.rich_text.map((props, i) => (
            <RichText {...props} key={i} />
          ))}
        </h3>
      );

    case "bulleted_list_item":
      return (
        <li {...rest}>
          {block.bulleted_list_item.rich_text.map((props, i) => (
            <RichText {...props} key={i} />
          ))}
        </li>
      );
    default:
      return (
        <div className="bg-red font-bold text-lg">
          Notion Element ${block.type} not supported
        </div>
      );
  }
};
const RichText = ({ annotations, plain_text }: RichTextItemResponse) => {
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
async function Page() {
  const data = await notion.blocks.children.list({
    block_id: "e0784623-c623-4d4f-80a8-4ed6da9aaa4c",
  });

  return (
    <>
      <Header />
      <div className="container mx-auto mb-auto overflow-auto text-white">
        {/* <ContentDappStore /> */}
        <div className="prose dark:prose-invert">
          {data.results.map((block) => {
            if (!("type" in block)) return null;
            const { type } = block;

            return <NotionElement block={block} key={block.id} />;
          }, [])}
        </div>
      </div>
      {version}
      <Footer />
    </>
  );
}

export default Page;

import { Client } from "@notionhq/client";
import { inspect } from "util";

export const notion = new Client({ auth: process.env.NOTION_API_KEY });
// https://www.notion.so/juliaortiz/1bb5db7703bf4ba9bf11fc845433bdc4?v=555d5688d0e0463b9740c9c09d02ce20&pvs=4
// https://www.notion.so/juliaortiz/Products-f6e90f71cd4a4f5b897b2fcc8e3d4950?pvs=4

// console.log(
//   inspect(
//     await notion.pages.retrieve({
//       page_id: "555d5688d0e0463b9740c9c09d02ce20",
//     }),
//     true,
//     5
//   )
// );
// console.log(
//   inspect(
//     await notion.blocks.children.list({
//       block_id: "555d5688d0e0463b9740c9c09d02ce20",
//     }),
//     true,
//     5
//   )
// );

console.log(
  inspect(
    await notion.databases.query({
      database_id: "1bb5db7703bf4ba9bf11fc845433bdc4",
    }),
    true,
    8,
    true
  )
);
// const product = await notion.databases.retrieve({
//   database_id: "ef8b5a0e46ac46f29c8336d5f65a785e",
// });

// // product details
// notion.databases.create({
//   parent: {
//     type: "page_id",
//     page_id: "98ad959b-2b6a-4774-80ee-00246fb0ea9b",
//   },
//   icon: {
//     type: "emoji",
//     emoji: "📝",
//   },
//   cover: {
//     type: "external",
//     external: {
//       url: "https://website.domain/images/image.png",
//     },
//   },
//   title: [
//     {
//       type: "text",
//       text: {
//         content: "Grocery List",
//         link: null,
//       },
//     },
//   ],
//   properties: {
//     product: {
//       relation: {
//         database_id: "",
//         dual_property: {},
//       },
//     },
//     locale: {
//       select: {
//         options: [
//           {
//             name: "en",
//           },
//           {
//             name: "pt",
//           },
//         ],
//       },
//     },
//   },
// });

import { z } from "zod";
import { richTextSchema } from "../partials/richTextSchema";
import { relationSchema } from "../partials/relationSchema";
import { titleSchema } from "../partials/titleSchema";
import fs from "fs/promises";

const fileSchema = z
  .object({
    type: z.literal("file"),
    file: z.object({
      url: z.string(),
    }),
  })
  .transform(({ type, file }) => ({
    type,
    url: file.url,
  }));
const externalSchema = z
  .object({
    type: z.literal("external"),
    external: z.object({
      url: z.string(),
    }),
  })
  .transform(({ type, external }) => ({
    type,
    url: external.url,
  }));
const emojiSchema = z.object({
  type: z.literal("emoji"),
  emoji: z.string(),
});

const urlSchema = z
  .object({
    url: z.string().nullable(),
  })
  .transform(({ url }) => url);

const checkboxSchema = z
  .object({
    checkbox: z.boolean(),
  })
  .transform(({ checkbox }) => checkbox);

const dappPropertiesSchema = z
  .object({
    "Display Name": richTextSchema,
    "Instant dApp": checkboxSchema,
    Name: titleSchema,
    Description: richTextSchema,
    ["Short Description"]: richTextSchema,
    "Sub-item": relationSchema,
    Twitter: urlSchema,
    App: urlSchema,
    GitHub: urlSchema,
    Discord: urlSchema,
  })
  .transform((data) => ({
    subItemNotionIds: data["Sub-item"],
    name: data.Name,
    displayName: data["Display Name"],
    description: data.Description,
    shortDescription: data["Short Description"],
    isInstantDapp: data["Instant dApp"],

    links: {
      twitter: data.Twitter,

      github: data.GitHub,
      discord: data.Discord,
    },

    app: data.App,
  }));

const fetchImageAsBase64 = async (url: string) => {
  try {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();

    return `data:${res.headers.get("content-type")};base64,${Buffer.from(
      buffer
    ).toString("base64")}`;
  } catch (e) {
    return null;
  }
};
export const dappSchema = z
  .object({
    id: z.string(),
    created_time: z.string(),
    last_edited_time: z.string(),
    properties: dappPropertiesSchema,
    icon: z
      .union([
        z.object({
          type: z.literal("emoji"),
          emoji: z.string(),
        }),
        fileSchema,
        externalSchema,
        z.null(),
      ])
      .transform(async (cover) => {
        if (cover && "url" in cover) return await fetchImageAsBase64(cover.url);
        return null;
      }),

    cover: z
      .union([fileSchema, externalSchema, z.null()])
      .transform(async (cover) => {
        if (cover && "url" in cover) return await fetchImageAsBase64(cover.url);
        return null;
      }),
  })
  .transform(
    ({ icon, cover, id, created_time, last_edited_time, properties }) => ({
      notionId: id,
      createdAt: created_time,
      updatedAt: last_edited_time,
      icon,
      cover,
      localized: {} as Record<
        string,
        {
          name: string;
          description: string;
        }
      >,
      ...properties,
    })
  );

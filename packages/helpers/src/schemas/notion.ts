import { z } from "zod";

export const checkboxSchema = z
  .object({
    checkbox: z.boolean(),
  })
  .transform(({ checkbox }) => checkbox);

export const titleSchema = z
  .object({
    title: z.array(
      z.object({
        plain_text: z.string(),
      })
    ),
  })
  .transform((data) => {
    return data.title.map((text) => text.plain_text).join(" ");
  });

export const richTextSchema = z
  .object({
    rich_text: z.array(
      z.object({
        plain_text: z.string(),
      })
    ),
  })
  .transform((data) => {
    return data.rich_text.map((text) => text.plain_text).join(" ");
  });

import slugify from "slugify";

export const createSlug = (name: string) =>
  slugify(name, { lower: true, strict: true });

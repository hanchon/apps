import { z } from "zod";
import { normalizeObjectKeys } from "./normalizeObjectsKeys";

export const createNotionPropertiesSchema = <T extends z.AnyZodObject>(
  schema: T
) =>
  z
    .record(z.unknown())
    .transform((props) => normalizeObjectKeys(props))
    .pipe(schema);

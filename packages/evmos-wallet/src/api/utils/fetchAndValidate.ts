import { z } from "zod";

export async function fetchAndValidate<TSchema extends z.ZodType<unknown>>(
  schema: TSchema,
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<z.infer<TSchema>> {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const json = (await response.json()) as unknown;
  const result = schema.safeParse(json);
  if (result.success) {
    return result.data;
  }

  const error = new Error(
    [
      `Failed to validate response from ${input}.\n${result.error.message}`,
      `Received:\n${JSON.stringify(json, null, 2)}`,
    ].join("\n"),
  );
  throw error;
}

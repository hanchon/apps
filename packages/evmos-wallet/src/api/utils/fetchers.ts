import { z } from "zod";

export const apiFetch = async <
  TSuccess extends z.ZodType<unknown>,
  TError extends z.ZodType<unknown>,
>(
  successSchema: TSuccess,
  errorSchema: TError,
  url: string,
  init?: RequestInit
): Promise<z.output<TSuccess>> => {
  const fetchResponse = await fetch(url, init);

  const parsedResponse = (await fetchResponse.json()) as unknown;

  if (fetchResponse.ok) {
    const validated = successSchema.parse(parsedResponse);

    return validated;
  }
  const parsedError = errorSchema.safeParse(parsedResponse);

  if (parsedError.success) {
    throw parsedError.data;
  }

  throw new Error(
    [
      `Failed to validate response from ${url}`,
      `Received:\n${JSON.stringify(parsedResponse, null, 2)}`,
    ].join("\n")
  );
};

export const apiBalancedFetch = async <TSuccess extends z.ZodType<unknown>>(
  successSchema: TSuccess,

  hosts: Readonly<[string, ...string[]]>,
  pathname: string,
  init?: RequestInit & {
    timeout?: number;
    millisecondsBetweenCalls?: number;
  }
): Promise<z.infer<TSuccess>> => {
  for (const host of hosts) {
    let response;
    try {
      response = await fetch(`${host}${pathname}`, {
        signal: AbortSignal.timeout(init?.timeout ?? 4000),
        ...init,
      });
    } catch (error) {
      continue;
    }
    const asJson: unknown = await response.json();
    if (response.ok) {
      return successSchema.parse(asJson);
    }

    if (response.status === 404) {
      throw new Error("NotFound", { cause: asJson });
    }

    break;
  }
  throw new Error(`Failed to fetch ${pathname}`);
};

import { E } from "helpers";
import { set, z } from "zod";

const sleep = (ms: number, abort: AbortController) =>
  new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, ms);
    abort.signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new Error("Aborted"));
    });
  });

export const apiFetch = async <
  TSuccess extends z.ZodType<unknown>,
  TError extends z.ZodType<unknown>,
>(
  successSchema: TSuccess,
  errorSchema: TError,
  url: string,
  init?: RequestInit,
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
    ].join("\n"),
  );
};

const delayCall = async <T extends (...args: unknown[]) => unknown>(
  fn: T,
  milliseconds: number,
  abortController: AbortController,
) => {
  await sleep(milliseconds, abortController);
  return await fn();
};

export const apiBalancedFetch2 = <
  TSuccess extends z.ZodType<unknown>,
  TError extends z.ZodType<unknown>,
>(
  successSchema: TSuccess,
  errorSchema: TError,
  hosts: Readonly<[string, ...string[]]>,
  pathname: string,
  init?: RequestInit & { timeout?: number; millisecondsBetweenCalls?: number },
) =>
  new Promise<z.output<TSuccess>>((resolve, reject) => {
    const controllers: AbortController[] = [];
    const promises = new Set(
      hosts.map((host, i) => {
        const abortController = new AbortController();
        controllers[i] = abortController;
        const promise = delayCall(
          () =>
            apiFetch(successSchema, errorSchema, `${host}${pathname}`, {
              ...init,
              signal: abortController.signal,
            }),
          i * (init?.millisecondsBetweenCalls ?? 1000),
          abortController,
        );

        promise
          .then((response) => {
            resolve(response);
            controllers.forEach((controller) => controller.abort());
          })
          .catch((error) => {
            console.log(error);
            promises.delete(promise);

            if (
              E.match.byPattern(error, /AbortError/) ||
              E.match.byPattern(error, /Aborted/) ||
              E.match.byPattern(error, /Failed to fetch/) ||
              E.match.byPattern(error, /fetch failed/gi) ||
              E.match.byPattern(error, /ENOTFOUND/)
            ) {
              if (promises.size === 0) {
                reject(new Error(`Failed to fetch ${pathname}`));
              }
              return;
            }

            reject(error);
            controllers.forEach((controller) => controller.abort());
          });
        return promise;
      }),
    );

    setTimeout(
      () => {
        controllers.forEach((controller) => controller.abort());
        reject(new Error(`Failed to fetch ${pathname}`));
      },
      init?.timeout ?? 10000,
    );
  });
export const apiBalancedFetch = async <
  TSuccess extends z.ZodType<unknown>,
  TError extends z.ZodType<unknown>,
>(
  successSchema: TSuccess,
  errorSchema: TError,
  hosts: Readonly<[string, ...string[]]>,
  pathname: string,
  init?: RequestInit & { timeout?: number; millisecondsBetweenCalls?: number },
) => {
  for (const host of hosts) {
    try {
      const abortController = new AbortController();
      const timeout = setTimeout(
        () => abortController.abort(),
        init?.timeout ?? 4000,
      );
      const response = await apiFetch(
        successSchema,
        errorSchema,
        `${host}${pathname}`,
        {
          signal: abortController.signal,
          ...init,
        },
      );
      clearTimeout(timeout);
      return response;
    } catch (error) {
      if (
        E.match.byPattern(error, /AbortError/) ||
        E.match.byPattern(error, /Aborted/) ||
        E.match.byPattern(error, /Failed to fetch/) ||
        E.match.byPattern(error, /fetch failed/gi) ||
        E.match.byPattern(error, /ENOTFOUND/)
      ) {
        continue;
      }
      throw new Error(`Failed to fetch ${pathname}`, { cause: error });
    }
  }
  throw new Error(`Failed to fetch ${pathname}`);
};

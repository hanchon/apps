import { E } from "helpers";
import { z } from "zod";

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
  init?: RequestInit
): Promise<z.output<TSuccess>> => {
  // try {
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

const delayCall = async <T extends (...args: unknown[]) => unknown>(
  fn: T,
  milliseconds: number,
  abortController: AbortController
) => {
  await sleep(milliseconds, abortController);
  return await fn();
};

export const apiBalancedFetch = <
  TSuccess extends z.ZodType<unknown>,
  TError extends z.ZodType<unknown>,
>(
  successSchema: TSuccess,
  errorSchema: TError,
  hosts: Readonly<[string, ...string[]]>,
  pathname: string,
  init?: RequestInit & { timeout?: number; millisecondsBetweenCalls?: number }
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
          abortController
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
      })
    );

    // const finish = () => {
    //   controllers.forEach((controller) => controller.abort());
    // };

    // const promises = hosts.map(
    //   async (host, i) =>
    //     new Promise((resolve, reject) => {
    //       const abortController = new AbortController();

    //       delayCall(
    //         () =>
    //           apiFetch(successSchema, errorSchema, `${host}${pathname}`, {
    //             ...init,
    //             signal: abortController.signal,
    //           }),

    //         i * (init?.millisecondsBetweenCalls ?? 1000),
    //         abortController
    //       )
    //         .then((response) => {
    //           resolve(response);
    //         })
    //         .catch((error) => {
    //           if (
    //             E.match.byPattern(error, /AbortError/) ||
    //             E.match.byPattern(error, /Aborted/) ||
    //             E.match.byMessage(error, "Failed to fetch") ||
    //             E.match.byPattern(error, /fetch failed/gi)
    //           ) {
    //             return;
    //           }
    //           reject(error);
    //         });
    //     })

    // );

    // const response = await Promise.race(
    //   hosts.map(
    //     (host, i) =>
    //       new Promise<Awaited<ReturnType<typeof timedOutFetch>>[1] & {}>(
    //         (resolve, reject) => {
    //           const abortController = new AbortController();
    //           controllers[i] = abortController;
    //           timedOutFetch(
    //             host,
    //             abortController,
    //             i * (init?.millisecondsBetweenCalls ?? 1000)
    //           ).then(([error, response]) => {
    //             if (response) {
    //               resolve(response);
    //               // finish();
    //               return;
    //             }
    //             // console.log("test", error?.name, pathname, error?.message);
    //             if (
    //               E.match.byPattern(error, /AbortError/) ||
    //               E.match.byPattern(error, /Aborted/) ||
    //               E.match.byMessage(error, "Failed to fetch") ||
    //               E.match.byPattern(error, /fetch failed/gi)
    //             ) {
    //               return;
    //             }

    //             // That means that we were able to reach the node
    //             // but it returned an error. So we shouldn't try other nodes which will likely return the same error
    //             // if (error) {
    //             // console.log("hi", error.name);
    //             reject(error);
    //           });

    //           // finish();

    //           // }
    //         }
    //       )
    //   )
    // );

    // finish();
    // return response;
    // resolve(resp);
    // }).finally(() => {
    //   // if this is called before any of the calls resolve the main promise,
    //   // that means that all calls failed

    //   console.log("FINISHED ALL");

    //   reject(new Error(`Failed to fetch ${pathname}`));
    // });

    setTimeout(
      () => {
        controllers.forEach((controller) => controller.abort());
        reject(new Error(`Failed to fetch ${pathname}`));
      },
      init?.timeout ?? 10000
    );
  });

type CommonRequesterConfig = {
  timeout?: number;
  fetcher: (url: string, init?: RequestInit) => Promise<Response>;
  successSchema: z.ZodType<unknown>;
  errorSchema: z.ZodType<unknown>;
};
type MultiHostConfig = CommonRequesterConfig & {
  url: {
    hosts: string[];
    pathname: string;
  };

  isResolved: (error: unknown, response: unknown) => boolean;
  intervalBetweenHosts?: number;
  abortPrevious?: boolean;
  healthCheck?: (host: string) => Promise<number>;
};

type SingleHostConfig = CommonRequesterConfig & {
  url: string;
};

type RequesterConfig = MultiHostConfig | SingleHostConfig;

const makeRequester = <const T extends RequesterConfig>(config: T) => {};

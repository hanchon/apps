import { ensureError } from "helpers/src/error-handling/normalizeError";

export const rankApis = async <T>(
  urls: string[],
  runTest: (
    url: string,
    time: <B>(cb: () => Promise<B>) => Promise<B>
  ) => Promise<T>
) => {
  const results = await Promise.all(
    urls.map(async (url) => {
      let start: null | number = null;
      let end: null | number = null;
      try {
        const res = await runTest(url, (cb) => {
          start = performance.now();
          const cbRes = cb();
          end = performance.now();
          return cbRes;
        });
        if (start === null || end === null) {
          throw new Error("start or end is null, dont forget to call time()");
        }
        return {
          url,
          error: null,
          responseTime: end - start,
          response: res,
        };
      } catch (e) {
        return {
          url,
          error: ensureError(e).message,
          responseTime: null,
          response: null,
        };
      }
    })
  );
  return results.sort((a, b) => {
    if (a.responseTime === null) {
      return 1;
    }
    if (b.responseTime === null) {
      return -1;
    }

    return a.responseTime - b.responseTime;
  });
};

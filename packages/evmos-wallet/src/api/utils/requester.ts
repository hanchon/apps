import { z } from "zod";

type CommonRequesterConfig = {
  timeout?: number;
  fetcher: (url: string, ...args: any[]) => Promise<Response>;
  onResponse: (error: unknown, response: unknown) => unknown;
  onError?: (error: unknown) => unknown;
  autoParseJSON?: boolean;
};
type MultiHostStrategyConfig = CommonRequesterConfig & {
  url: {
    hosts: string[];
    pathname: string;
  };

  isResolved: (error: unknown, response: unknown) => boolean;
  intervalBetweenHosts?: number;
  abortPrevious?: boolean;
  healthCheck?: (host: string) => Promise<number>;
};

type SingleHostStrategyConfig = CommonRequesterConfig & {
  url: string;
};

type RequesterConfig = MultiHostStrategyConfig | SingleHostStrategyConfig;

type Tail<T extends any[]> = T extends [any, ...infer U] ? U : never;

const makeRequester = <const T extends RequesterConfig>(config: T) => {
  return (...args: Tail<Parameters<T["fetcher"]>>) => {};
};

const apiCosmos = makeRequester({
  url: "https://api.cosmos.network",
  fetcher: (url, params: { test: boolean }) => {
    return fetch(url);
  },
  onResponse: (error, response) => {
    console.log(error, response);
  },
});

apiCosmos({
  test: true,
});

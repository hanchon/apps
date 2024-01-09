import { Octokit } from "octokit";
import { cachedFetch } from "../cached-fetch";

export const github = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  request: {
    fetch: (input: RequestInfo | URL, init: RequestInit = {}) =>
      cachedFetch(input, {
        ...init,
        next: { revalidate: 60 * 60 * 24, tags: ["github-api"] },
        devCache: { revalidate: 60 * 60 * 24, tags: ["github-api"] },
      }),
  },
});

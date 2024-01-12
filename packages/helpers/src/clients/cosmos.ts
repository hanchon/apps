import createClient from "openapi-fetch";
import { paths } from "../../autogen/cosmos-client";

export const cosmos = (chain: string) =>
  createClient<paths>({
    baseUrl: `/api/cosmos-rest/${chain}/`,
  });

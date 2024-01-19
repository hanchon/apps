import { cosmos } from "helpers/src/clients/cosmos";
import { fetchPreferredCosmosRestUrl } from "../metrics/queries/fetch-preferred-cosmos-rest-url";

export const serverCosmos = async (chain: string) =>
  cosmos(chain, {
    baseUrl: (await fetchPreferredCosmosRestUrl(chain)).preferred,
    fetch,
  });

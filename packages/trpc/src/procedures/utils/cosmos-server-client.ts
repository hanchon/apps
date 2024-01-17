import { cosmos } from "helpers/src/clients/cosmos";
import { fetchPreferredCosmosRestUrl } from "../metrics/queries/preferred-cosmos-rest/server";

export const serverCosmos = async (chain: string) =>
  cosmos(chain, {
    baseUrl: (await fetchPreferredCosmosRestUrl(chain)).preferred,
    fetch,
  });

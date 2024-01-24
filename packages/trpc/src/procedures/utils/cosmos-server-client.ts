// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cosmos } from "helpers/src/clients/cosmos";
import { fetchPreferredCosmosRestUrl } from "../metrics/queries/fetch-preferred-cosmos-rest-url";

export const serverCosmos = async (chain: string) =>
  cosmos(chain, {
    baseUrl: (await fetchPreferredCosmosRestUrl(chain)).preferred,
    fetch,
  });

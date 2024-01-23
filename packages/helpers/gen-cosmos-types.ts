// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { writeFile } from "fs/promises";
import openapiTS from "openapi-typescript";

const spec = (await fetch("https://api.evmos.dev/openapi.json").then((res) =>
  res.json(),
)) as {
  paths: {
    "/cosmos/gov/v1/proposals/{proposal_id}": {
      get: {
        operationId: string;
      };
    };
  };
};
spec.paths["/cosmos/gov/v1/proposals/{proposal_id}"].get.operationId =
  "GovV1ProposalsProposalIdGet";

const file = await openapiTS(spec as never, {});

await writeFile("./src/clients/cosmos-client.d.ts", file);

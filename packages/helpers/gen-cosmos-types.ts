// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { writeFile } from "fs/promises";
import {} from "openapi-typescript";
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
import openapiTS from "openapi-typescript";
spec.paths["/cosmos/gov/v1/proposals/{proposal_id}"].get.operationId =
  "GovV1ProposalsProposalIdGet";
const ast = await openapiTS(spec as any, {});
// const contents = astToString(ast);

// console.log(ast);
writeFile("./src/clients/cosmos-client.d.ts", ast);

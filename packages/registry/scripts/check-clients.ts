import { get } from "lodash-es";
import { readFiles } from "./readFiles";
import { ChainRegistry } from "./types/chain";

const chains = await readFiles<ChainRegistry>(
  "node_modules/chain-token-registry/chainConfig/*.json"
);
const url =
  "https://g.w.lavanet.xyz:443/gateway/evmos/rest/ef1ad852a77275e1eeef6c7972370118";

for (const chainRegistry of chains) {
  if (chainRegistry.prefix === "evmos") {
    continue;
  }
  if (!chainRegistry.configurations) {
    continue;
  }
  for (const {
    clientId,
    identifier,
    source,
    rest,
  } of chainRegistry.configurations) {
    const clientStatus = await fetch(
      `${url}/ibc/core/client/v1/client_status/${clientId}`
    );
    const json = (await clientStatus.json()) as unknown;
    console.log(identifier);
    console.log(clientId, get(json, "status"));
    if (!source) {
      console.log("no source");
      continue;
    }
    const channelInfo = await fetch(
      `${rest[0]}/ibc/core/channel/v1/channels/${source.sourceChannel}/ports/transfer`
    );
    const channelJson = (await channelInfo.json()) as unknown;
    const connectionId = get(channelJson, "channel.connection_hops[0]") as
      | string
      | undefined;

    if (!connectionId) {
      console.log("no connection id");
      console.log("------------------");
      continue;
    }
    const connectionInfo = await fetch(
      `${rest[0]}/ibc/core/connection/v1/connections/${connectionId}/client_state`
    );
    const connectionInfoJson = (await connectionInfo.json()) as unknown;
    const counterpartyClientId = get(
      connectionInfoJson,
      "identified_client_state.client_id"
    ) as string | undefined;

    if (!counterpartyClientId) {
      console.log("no client id");
      console.log("------------------");

      continue;
    }
    console.log("Counterparty");
    const counterpartyClientStatus = await fetch(
      `${rest[0]}/ibc/core/client/v1/client_status/${counterpartyClientId}`
    );
    const counterpartyClientStatusJson =
      (await counterpartyClientStatus.json()) as unknown;

    console.log(
      counterpartyClientId,
      get(counterpartyClientStatusJson, "status")
    );
    console.log("------------------");
  }
}

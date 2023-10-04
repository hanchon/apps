const lavaUserId = "ef1ad852a77275e1eeef6c7972370118";

export const lavaUrls: Record<
  string,
  {
    cosmosRest: string;
    tendermintRest: string;
    evmRest?: string;
  }
> = {
  evmos: {
    cosmosRest: `https://g.w.lavanet.xyz:443/gateway/evmos/rest/${lavaUserId}`,
    tendermintRest: `https://g.w.lavanet.xyz:443/gateway/evmos/tendermint-rpc-http/${lavaUserId}`,
    evmRest: `https://g.w.lavanet.xyz:443/gateway/evmos/json-rpc-http/${lavaUserId}`,
  },
  evmostestnet: {
    cosmosRest: `https://g.w.lavanet.xyz:443/gateway/evmost/rest/${lavaUserId}`,
    tendermintRest: `https://g.w.lavanet.xyz:443/gateway/evmost/tendermint-rpc-http/${lavaUserId}`,
    evmRest: `https://g.w.lavanet.xyz:443/gateway/evmost/json-rpc-http/${lavaUserId}`,
  },
  cosmoshub: {
    cosmosRest: `https://g.w.lavanet.xyz:443/gateway/cos5/rest/${lavaUserId}`,
    tendermintRest: `https://g.w.lavanet.xyz:443/gateway/cos5/tendermint-rpc-http/${lavaUserId}`,
  },
  cosmoshubtestnet: {
    cosmosRest: `https://g.w.lavanet.xyz:443/gateway/cos5t/rest/${lavaUserId}`,
    tendermintRest: `https://g.w.lavanet.xyz:443/gateway/cos5t/tendermint-rpc-http/${lavaUserId}`,
  },
  juno: {
    cosmosRest: `https://g.w.lavanet.xyz:443/gateway/jun1/rest/${lavaUserId}`,
    tendermintRest: `https://g.w.lavanet.xyz:443/gateway/jun1/tendermint-rpc-http/${lavaUserId}`,
  },
  junotestnet: {
    cosmosRest: `https://g.w.lavanet.xyz:443/gateway/junt1/rest/${lavaUserId}`,
    tendermintRest: `https://g.w.lavanet.xyz:443/gateway/junt1/tendermint-rpc-http/${lavaUserId}`,
  },
  osmosis: {
    cosmosRest: `https://g.w.lavanet.xyz:443/gateway/cos3/rest/${lavaUserId}`,
    tendermintRest: `https://g.w.lavanet.xyz:443/gateway/cos3/tendermint-rpc-http/${lavaUserId}`,
  },
  osmosistestnet: {
    cosmosRest: `https://g.w.lavanet.xyz:443/gateway/cos4/rest/${lavaUserId}`,
    tendermintRest: `https://g.w.lavanet.xyz:443/gateway/cos4/tendermint-rpc-http/${lavaUserId}`,
  },
  axelar: {
    cosmosRest: `https://g.w.lavanet.xyz:443/gateway/axelar/rest/${lavaUserId}`,
    tendermintRest: `https://g.w.lavanet.xyz:443/gateway/axelar/tendermint-rpc-http/${lavaUserId}`,
  },
  axelartestnet: {
    cosmosRest: `https://g.w.lavanet.xyz:443/gateway/axelart/rest/${lavaUserId}`,
    tendermintRest: `https://g.w.lavanet.xyz:443/gateway/axelart/tendermint-rpc-http/${lavaUserId}`,
  },
};

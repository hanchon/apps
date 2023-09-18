/* eslint-disable */
/**
 * DO NOT MANUALLY EDIT THIS FILE!
 * This file is generated by calling the `pnpm run build:registry` command.
 * 
 * You can find the source code for this script on /scripts/typegen.ts
 */

export default {
  "prefix": "evmos",
  "name": "Evmos",
  "cosmosId": "evmos_9001-2",
  "evmId": 9001,
  "gasPriceStep": {
    "low": "10000000000",
    "average": "25000000000",
    "high": "40000000000"
  },
  "feeToken": "aevmos",
  "currencies": [
    {
      "name": "EVMOS",
      "description": "EVMOS",
      "images": {
        "png": "statics/EVMOS.png",
        "svg": "statics/EVMOS.svg"
      },
      "denom": "EVMOS",
      "channel": "",
      "sourcePrefix": "evmos",
      "baseDenom": "aevmos",
      "minCoinDenom": "aevmos",
      "cosmosDenom": "aevmos",
      "category": "cosmos",
      "type": "IBC",
      "decimals": 18,
      "erc20Address": "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517"
    },
    {
      "name": "NEOKingdom DAO",
      "description": "NEOKingdom DAO",
      "images": {
        "png": "statics/NEOK.png"
      },
      "denom": "NEOK",
      "channel": "",
      "sourcePrefix": "evmos",
      "baseDenom": "erc20/0x655ecB57432CC1370f65e5dc2309588b71b473A9",
      "minCoinDenom": "neok",
      "cosmosDenom": "erc20/0x655ecB57432CC1370f65e5dc2309588b71b473A9",
      "category": "cosmos",
      "type": "IBC",
      "decimals": 18,
      "erc20Address": "0x655ecB57432CC1370f65e5dc2309588b71b473A9"
    }
  ],
  "clientId": null,
  "source": null,
  "cosmosRest": {
    "http": [
      "https://rest.bd.evmos.org:1317",
      "https://api-evmos-ia.cosmosia.notional.ventures",
      "https://api.evmos.interbloc.org",
      "https://lcd.evmos.bh.rocks",
      "https://lcd.evmos.disperze.network",
      "https://evmos-rest.publicnode.com"
    ]
  },
  "cosmosGRPC": {
    "http": [
      "https://grpc.bd.evmos.org:9090"
    ]
  },
  "evmRest": {
    "http": [
      "https://jsonrpc-rpcaas-evmos-mainnet.ubiquity.blockdaemon.tech",
      "https://eth.bd.evmos.org:8545",
      "https://jsonrpc-evmos-ia.cosmosia.notional.ventures",
      "https://evmos-json-rpc.stakely.io",
      "https://jsonrpc.evmos.nodestake.top",
      "https://json-rpc.evmos.bh.rocks"
    ]
  },
  "tendermint": {
    "http": [
      "https://rpc-evmos.whispernode.com",
      "https://tendermint.bd.evmos.org:26657",
      "https://rpc.evmos.ezstaking.io",
      "https://rpc-evmos-ia.cosmosia.notional.ventures:443",
      "https://rpc.evmos.posthuman.digital",
      "https://rpc.evmos.interbloc.org",
      "https://rpc.evmos.nodestake.top",
      "https://rpc-evmos.ecostake.com",
      "https://rpc.evmos.bh.rocks"
    ]
  }
} as const;
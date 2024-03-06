// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

/* eslint-disable */
/**
 * DO NOT MANUALLY EDIT THIS FILE!
 * This file is generated by calling the `pnpm run build:registry` command.
 * 
 * You can find the source code for this script on /scripts/typegen.ts
 */

export default {
  "prefix": "evmos",
  "name": "Evmos Testnet",
  "cosmosId": "evmos_9000-4",
  "identifier": "evmostestnet",
  "gasPriceStep": {
    "low": "10000000000",
    "average": "25000000000",
    "high": "40000000000"
  },
  "evmId": 9000,
  "channels": null,
  "feeToken": "atevmos",
  "cosmosRest": [
    "https://rest.evmos-testnet.lava.build",
    "https://g.w.lavanet.xyz:443/gateway/evmost/rest/549a760ba95638964be1942980693d34",
    "https://rest.bd.evmos.dev:1317",
    "https://evmos.test.api.coldyvalidator.net",
    "https://evmos-testnet-api.polkachu.com",
    "https://api-t.evmos.nodestake.top",
    "https://evmos-testnet-lcd.qubelabs.io"
  ],
  "tendermintRest": [
    "https://tm.evmos-testnet.lava.build",
    "https://g.w.lavanet.xyz:443/gateway/evmost/rpc-http/549a760ba95638964be1942980693d34",
    "https://tendermint.bd.evmos.dev:26657",
    "https://evmos.test.rpc.coldyvalidator.net",
    "https://evmos-testnet-rpc.polkachu.com",
    "https://evmos-testnet-rpc.qubelabs.io",
    "https://evmos-testnet-rpc.polkachu.com:443",
    "https://rpc-t.evmos.nodestake.top"
  ],
  "evmRest": [
    "https://evmos-testnet.lava.build",
    "https://g.w.lavanet.xyz:443/gateway/evmost/json-rpc-http/549a760ba95638964be1942980693d34",
    "https://eth.bd.evmos.dev:8545",
    "https://jsonrpc-t.evmos.nodestake.top",
    "https://evmos-testnet-json.qubelabs.io"
  ],
  "cosmosGRPC": [
    "https://g.w.lavanet.xyz:443/gateway/evmost/rpc-http/549a760ba95638964be1942980693d34",
    "https://tendermint.bd.evmos.dev:26657",
    "https://evmos.test.rpc.coldyvalidator.net",
    "https://evmos-testnet-rpc.polkachu.com",
    "https://evmos-testnet-rpc.qubelabs.io",
    "https://evmos-testnet-rpc.polkachu.com:443",
    "https://rpc-t.evmos.nodestake.top"
  ],
  "tokens": [
    {
      "name": "EVMOS",
      "ref": "evmos:EVMOS",
      "description": "EVMOS",
      "symbol": "EVMOS",
      "denom": "EVMOS",
      "sourcePrefix": "evmos",
      "sourceDenom": "atevmos",
      "minCoinDenom": "atevmos",
      "category": "cosmos",
      "tokenRepresentation": "EVMOS",
      "type": "IBC",
      "decimals": 18,
      "erc20Address": "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517",
      "handledByExternalUI": null,
      "listed": true,
      "coingeckoId": "evmos"
    },
    {
      "name": "Wizzard Token",
      "ref": "evmos:WIZZ",
      "description": "Wizzard Coin",
      "symbol": "WIZZ",
      "denom": "WIZZ",
      "sourcePrefix": "evmos",
      "sourceDenom": "erc20/0xCF4E2cae6193f943C8f39B6012B735CAD37d8F4a",
      "minCoinDenom": "wizz",
      "category": "cosmos",
      "tokenRepresentation": "WIZZ",
      "type": "IBC",
      "decimals": 18,
      "erc20Address": "0xCF4E2cae6193f943C8f39B6012B735CAD37d8F4a",
      "handledByExternalUI": null,
      "listed": true,
      "coingeckoId": ""
    }
  ],
  "explorerUrl": "https://testnet.escan.live/tx",
  "env": "testnet"
} as const;
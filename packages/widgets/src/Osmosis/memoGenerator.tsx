// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// Constants

export const OSMOSIS_OUTPOST_CONTRACT =
  // eslint-disable-next-line no-secrets/no-secrets
  "osmo18rj46qcpr57m3qncrj9cuzm0gn3km08w5jxxlnw002c9y7xex5xsu74ytz";

export const NO_OSMOSIS_FALLBACK = "do_nothing";

export const UOSMO_DENOM_IN_OSMOSIS = "uosmo";
export const AEVMOS_DENOM_IN_OSMOSIS =
  "ibc/6AE98883D4D5D5FF9E50D7130F1305DA2FFA0C652D1DD9C123657C6B4EB2DF8A";

export const UOSMO_DENOM_ERC20_IN_EVMOS =
  "0xFA3C22C069B9556A4B2f7EcE1Ee3B467909f4864";

export const UOSMO_DENOM_IBC_IN_EVMOS =
  "ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518";

export const EVMOS_ERC20_IN_EVMOS =
  "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517";

// Types
type onFailedDelivery = string | { local_recovery_addr: string };
type OsmosisOutpostMemo = {
  wasm: {
    contract: string;
    msg: {
      osmosis_swap: {
        output_denom: string;
        slippage: {
          twap: {
            slippage_percentage: string;
            window_seconds: number;
          };
        };
        receiver: string;
        on_failed_delivery: onFailedDelivery;
      };
    };
  };
};

export type OsmosisMemoParams = {
  outputDenom: string;
  slippagePercentage: string;
  windowSeconds: number;
  receiver: string;
  fallbackAddress: string;
};

// GenerateOsmosisMemo validates slippage, windowSeconds, denom and fallback address (NOTE: throws on error)
export function GenerateOsmosisMemo(
  params: OsmosisMemoParams,
  // The contract address in the osmosis chain should not change
  contract: string = OSMOSIS_OUTPOST_CONTRACT,
) {
  // Validations
  const slippage = Number(params.slippagePercentage);

  if (slippage < 0 || slippage > 20) {
    throw new RangeError(
      "slippage value must be greater than 0 and lower than 20",
    );
  }

  if (params.windowSeconds < 0 || params.windowSeconds > 60) {
    throw new RangeError(
      "windowSeconds value must be greater than 0 and lower than 60",
    );
  }

  // NOTE: the outpost only support base denom and the denom must be the one on osmosis
  if (
    params.outputDenom != UOSMO_DENOM_IN_OSMOSIS &&
    params.outputDenom != AEVMOS_DENOM_IN_OSMOSIS
  ) {
    throw new TypeError(
      `only ${UOSMO_DENOM_IN_OSMOSIS} and ${AEVMOS_DENOM_IN_OSMOSIS} are supported as denominations`,
    );
  }

  const validWallet =
    params.fallbackAddress.startsWith("osmo1") &&
    params.fallbackAddress.length == 43;

  if (params.fallbackAddress != NO_OSMOSIS_FALLBACK && !validWallet) {
    throw new TypeError("invalid fallback address");
  }

  let onFailedDelivery: onFailedDelivery = params.fallbackAddress;

  if (validWallet) {
    onFailedDelivery = {
      local_recovery_addr: params.fallbackAddress,
    };
  }

  // Create message
  const msg: OsmosisOutpostMemo = {
    wasm: {
      contract: contract,
      msg: {
        osmosis_swap: {
          output_denom: params.outputDenom,
          slippage: {
            twap: {
              slippage_percentage: params.slippagePercentage,
              window_seconds: params.windowSeconds,
            },
          },
          receiver: params.receiver,
          on_failed_delivery: onFailedDelivery,
        },
      },
    },
  };
  return JSON.stringify(msg);
}

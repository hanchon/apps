// Constants

export const OSMOSIS_OUTPOST_CONTRACT =
  // eslint-disable-next-line no-secrets/no-secrets
  "osmo18rj46qcpr57m3qncrj9cuzm0gn3km08w5jxxlnw002c9y7xex5xsu74ytz";

export const NO_OSMOSIS_FALLBACK = "do_nothing";

export const UOSMO_DENOM = "uosmo";
export const AEVMOS_DENOM =
  "ibc/6AE98883D4D5D5FF9E50D7130F1305DA2FFA0C652D1DD9C123657C6B4EB2DF8A";

// Types
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
        on_failed_delivery: string;
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
  if (params.outputDenom != UOSMO_DENOM && params.outputDenom != AEVMOS_DENOM) {
    throw new TypeError(
      `only ${UOSMO_DENOM} and ${AEVMOS_DENOM} are supported as denominations`,
    );
  }

  const validWallet =
    params.fallbackAddress.startsWith("osmo1") &&
    params.fallbackAddress.length == 43;

  if (params.fallbackAddress != NO_OSMOSIS_FALLBACK && !validWallet) {
    throw new TypeError("invalid fallback address");
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
          on_failed_delivery: params.fallbackAddress,
        },
      },
    },
  };
  return JSON.stringify(msg);
}

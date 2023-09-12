import { Address } from "../../wallet";
import { Prefix, TokenMinDenom } from "../types";
import { getIBCChannelId } from "./get-ibc-channel-id";
import { getChainByTokenDenom } from "../get-chain-by-token-min-denom";
import { toIBCDenom } from "helpers";
import { normalizeToPrefix } from "./normalize-to-prefix";
import { getTokenByMinDenom } from "../get-token-by-min-denom";

export const getIBCDenom = ({
  sender,
  receiver,
  minDenom,
}: {
  sender: Address<Prefix> | Prefix;
  receiver: Address<Prefix> | Prefix;
  minDenom: TokenMinDenom;
}) => {
  const chain = getChainByTokenDenom(minDenom);
  if (chain.prefix === normalizeToPrefix(sender)) {
    return minDenom;
  }
  let baseDenom: string = minDenom;
  if (chain.prefix === "evmos" && minDenom !== "aevmos") {
    /**
     * TODO: We need a "baseDenom" field in the registry
     *
     * currently we have
     * - cosmosDenom, which is being used for ICS20 prefixed with ibc/, for outside tokens held on EVMOS
     * - minCoinDenom, which is usually what baseDenom is expected to be, and it's what we are using as token identifier most of the time here
     * but in the case of NEOK, it's marked as 'neok', which I guess is correct, but the actual denom we need is the erc/ prefixed one
     *
     * baseDenom needs to be the actual denom that is transferred out, and that's used to generate ics ibc/ identifiers
     *
     */
    const token = getTokenByMinDenom(minDenom);
    baseDenom = token.cosmosDenom;
  }

  return toIBCDenom(
    "transfer",
    getIBCChannelId({
      sender,
      receiver,
    }),
    baseDenom
  );
};

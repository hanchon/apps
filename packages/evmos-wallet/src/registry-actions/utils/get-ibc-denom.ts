import { Address } from "../../wallet";
import { Prefix, Token } from "../types";
import { getIBCChannelId } from "./get-ibc-channel-id";
import { toIBCDenom } from "helpers";
import { normalizeToPrefix } from "./normalize-to-prefix";
import { chains } from "@evmos-apps/registry";

export const getIBCDenom = ({
  sender,
  receiver,
  token,
}: {
  sender: Address<Prefix> | Prefix;
  receiver: Address<Prefix> | Prefix;
  token: Token;
}) => {
  const chain = chains[token.sourcePrefix];
  if (chain.prefix === normalizeToPrefix(sender)) {
    return token.minCoinDenom;
  }

  return toIBCDenom(
    "transfer",
    getIBCChannelId({
      sender,
      receiver,
    }),
    token.baseDenom
  );
};

import { Address, getPrefix } from "../../wallet";
import { Prefix, TokenMinDenom } from "../types";
import { getIBCChannelId } from ".";
import { getChainByTokenDenom } from "../get-chain-by-token-min-denom";
import { toIBCDenom } from "helpers";

export const getIBCDenom = ({
  sender,
  receiver,
  minDenom,
}: {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
  minDenom: TokenMinDenom;
}) => {
  const chain = getChainByTokenDenom(minDenom);
  if (chain.prefix === getPrefix(sender)) {
    return minDenom;
  }
  return toIBCDenom(
    "transfer",
    getIBCChannelId({
      sender,
      receiver,
    }),
    minDenom
  );
};

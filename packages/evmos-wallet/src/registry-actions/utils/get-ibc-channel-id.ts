import { chains } from "@evmos-apps/registry";
import { Address } from "../../wallet";

import { Prefix } from "../types";
import { normalizeToPrefix } from "./normalize-to-prefix";

export const getIBCChannelId = ({
  sender,
  receiver,
}: {
  sender: Address<Prefix> | Prefix;
  receiver: Address<Prefix> | Prefix;
}) => {
  const senderChain = chains[normalizeToPrefix(sender)];
  const receiverChain = chains[normalizeToPrefix(receiver)];

  if (senderChain.prefix !== "evmos") {
    return senderChain.channels.evmos.channelId;
  }
  if (receiverChain.prefix !== "evmos") {
    return receiverChain.channels.evmos.counterpartyChannelId;
  }
  throw new Error(
    `Could not find channel id for ${senderChain.name} -> ${receiverChain.name}`
  );
};

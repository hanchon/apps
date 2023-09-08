import { Address } from "../../wallet";
import { getChainByAddress } from "../get-chain-by-account";
import { Prefix } from "../types";

export const getIBCChannelId = ({
  sender,
  receiver,
}: {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
}) => {
  const senderChain = getChainByAddress(sender);
  const receiverChain = getChainByAddress(receiver);

  if (senderChain.prefix !== "evmos") {
    return senderChain.source.sourceChannel;
  }
  if (receiverChain.prefix !== "evmos") {
    return receiverChain.source.destinationChannel;
  }
  throw new Error(
    `Could not find channel id for ${senderChain.name} -> ${receiverChain.name}`
  );
};

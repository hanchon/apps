import Image from "next/image";
import React from "react";
import { formatUnits } from "viem";
import { cn } from "helpers";
import { Prefix, TokenMinDenom } from "evmos-wallet/src/registry-actions/types";
import {
  Address,
  getPrefix,
  getTokenByMinDenom,
  normalizeToCosmosAddress,
} from "evmos-wallet";
import { chains } from "@evmos-apps/registry";
import { Arrow } from "ui-helpers";

export const TransferSummary = ({
  sender,
  receiver,
  token,
  fee,
}: {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
  token: {
    denom: TokenMinDenom;
    amount: bigint;
  };

  fee?: {
    denom: TokenMinDenom;
    amount: bigint;
  };
}) => {
  const senderPrefix = getPrefix(normalizeToCosmosAddress(sender));
  const receiverPrefix = getPrefix(normalizeToCosmosAddress(receiver));
  const senderChain = chains[senderPrefix];
  const receiverChain = chains[receiverPrefix];

  const { name, decimals, denom } = getTokenByMinDenom(token.denom);
  const feeToken = fee ? getTokenByMinDenom(fee.denom) : null;
  return (
    // TODO: we need to add opacity-50 in the div below if the user doesn't have enough balance to pay the fee
    <div className="flex items-stretch ">
      {senderChain && (
        <div className="flex flex-col space-y-2">
          <Image
            className="h-12 w-12"
            src={`/assets/chains/${senderChain.prefix}.png`}
            width={48}
            height={48}
            alt={senderChain.name}
          />
          <p className="text-xxs text-gray-200">Account 1</p>
        </div>
      )}
      <div className="px-4 h-full justify-center flex flex-col items-center flex-grow">
        <h3 className="text-xs font-bold flex justify-center items-center gap-x-2 text-white">
          <Image
            className="h-6 w-6"
            src={`/assets/tokens/${denom}.png`}
            width={18}
            height={18}
            alt={name}
          />
          {formatUnits(token.amount, decimals)} {denom}
        </h3>

        <Arrow />
        {fee && feeToken && (
          <p className="text-white text-xxs">
            Fee:{" "}
            <span className="text-pink-300">
              {formatUnits(fee.amount, feeToken.decimals)} {feeToken.denom}
            </span>
          </p>
        )}
      </div>
      {receiverChain && (
        <div className="flex flex-col space-y-2">
          <Image
            className="h-12 w-12"
            src={`/assets/chains/${receiverChain.prefix}.png`}
            width={48}
            height={48}
            alt={receiverChain.name}
          />
          <p className="text-xxs text-gray-200">Account 2</p>
        </div>
      )}
    </div>
  );
};

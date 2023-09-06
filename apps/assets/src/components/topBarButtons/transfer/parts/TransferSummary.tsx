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

export const TransferSummary = ({
  sender,
  receiver,
  token,
}: {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
  token: {
    denom: TokenMinDenom;
    amount: bigint;
  };
}) => {
  const senderPrefix = getPrefix(normalizeToCosmosAddress(sender));
  const receiverPrefix = getPrefix(normalizeToCosmosAddress(receiver));
  const senderChain = chains[senderPrefix];
  const receiverChain = chains[receiverPrefix];

  const { name, decimals, denom } = getTokenByMinDenom(token.denom);

  return (
    <div className="flex items-stretch">
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

        <hr
          className={cn(
            "relative h-[2px] bg-gradient-to-r to-[#FCDBD6CC] from-[#FF745DCC] overflow-visible border-0 w-full my-2",
            // arrow
            "after:absolute after:block after:right-0",
            "after:h-2 after:w-2",
            "after:border-t-2 after:border-r-2 after:border-t-gradient-to-r after:border-t-[#FCDBD6CC] after:border-r-[#FCDBD6CC]",
            "after:rotate-45 after:top-1/2 after:-translate-y-1/2"
          )}
        />
        <p className="text-white text-xxs">
          Fee: <span className="text-pink-300">0.005 EVMOS</span>
        </p>
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

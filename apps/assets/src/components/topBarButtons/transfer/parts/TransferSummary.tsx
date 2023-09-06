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
    <div className="flex items-center ">
      {senderChain && (
        <Image
          className="h-12 w-12"
          src={`/assets/chains/${senderChain.name}.png`}
          width={48}
          height={48}
          alt={senderChain.name}
        />
      )}
      <div className="grow px-4 justify-center flex flex-col items-center">
        <h3 className="text-xs font-bold flex justify-center items-center gap-x-2 text-white mb-2">
          <Image
            className="h-6 w-6"
            src={`/assets/tokens/${name}.png`}
            width={18}
            height={18}
            alt={name}
          />
          {formatUnits(token.amount, parseInt(String(decimals)))}
          {denom}
        </h3>

        <hr
          className={cn(
            "relative h-1 bg-slate-500 overflow-visible border-0 w-full",
            // arrow
            "after:absolute after:block after:right-0",
            "after:h-4 after:w-4",
            "after:border-t-4 after:border-r-4",
            "after:border-slate-500",
            "after:rotate-45 after:top-1/2 after:-translate-y-1/2"
          )}
        />
        <p className="text-white text-xxs">
          Fee: <span className="text-pink-300">0.005 EVMOS</span>
        </p>
      </div>
      {receiverChain && (
        <Image
          className="h-12 w-12"
          src={`/assets/chains/${receiverChain.name}.png`}
          width={48}
          height={48}
          alt={receiverChain.name}
        />
      )}
    </div>
  );
};

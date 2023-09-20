import Image from "next/image";
import { formatUnits } from "viem";

export function AmountBox({
  amount,
  token,
  amountInUsd,
}: {
  amount: bigint;
  token: {
    denom: string;
    name: string;
    decimals: number;
  };
  amountInUsd: string | null;
}) {
  return (
    <div className="flex rounded-md bg-gray-500 py-2 px-4 items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          className="h-7 w-7 rounded-full"
          src={`/assets/chains/${token.denom}.png`}
          alt=""
          width={30}
          height={30}
        />
        <span className="text-sm">{token.name}</span>
      </div>

      <div className="font-medium flex flex-col justify-between pl-4 text-white">
        <div>
          <>
            <div>{formatUnits(amount, token.decimals)}</div>
          </>
        </div>
        <div className="text-gray-400 text-xs">
          {amountInUsd !== null && `≈${amountInUsd}`}
        </div>
      </div>
    </div>
  );
}

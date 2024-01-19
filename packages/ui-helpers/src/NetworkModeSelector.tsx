"use client";
import { cn } from "helpers";
import { useConfig, useSwitchChain } from "wagmi";
import { getChainId } from "wagmi/actions";
import { Chain } from "viem";

export const NetworkModeSelector = () => {
  const { switchChain } = useSwitchChain();

  const config = useConfig();

  return (
    <div className="border-2 border-red-300 rounded-md m-4 flex">
      {config.chains.map((chain) => {
        const networkType = (
          chain as Chain & {
            networkType: string;
          }
        ).networkType;

        return (
          <button
            data-testid={`network-mode-selector-${networkType}`}
            key={networkType}
            onClick={() => {
              switchChain({ chainId: chain.id });
            }}
            className={cn(
              "text-white py-2 px-3 uppercase text-xxs font-bold grow ",
              {
                "bg-red-300": chain.id === getChainId(config),
              }
            )}
          >
            {networkType}
          </button>
        );
      })}
    </div>
  );
};

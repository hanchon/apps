"use client";
// import {
//   HexAddress,
//   getERC20TokenBalances,
//   normalizeToEvmos,
//   useAssets,
//   useTokenBalance,
// } from "@evmosapps/evmos-wallet";
import { useState } from "react";
// import { useAccount } from "wagmi";
// import { Dispatch, SetStateAction } from "react";
// import { useSelector } from "react-redux";
// import {
//   KEPLR_KEY,
//   METAMASK_KEY,
//   WALLECT_CONNECT_KEY,
//   EVMOS_SYMBOL,
//   StoreType,
// } from "@evmosapps/evmos-wallet";
import { useOsmosisData } from "./useOsmosisData";
import { cn, convertAndFormat, formatNumber } from "helpers";
import { useOsmosisQoute } from "./useOsmosQuote";
import { BigNumber } from "@ethersproject/bignumber";

import { debounce } from "lodash";
import { formatUnits, parseUnits } from "viem";
// parseEther
import {
  ChevronDownIconOsmosis,
  DownArrowIconOsmosisIcon,
  SwapIcon,
} from "icons";
import { SlippagePopover } from "./SlippagePopover";
import Image from "next/image";

// type SwapOption = {
//   erc20Address: string;
//   name: string;
//   symbol: string;
// };

export default function Osmosis() {
  // const { isConnected, connector, address } = useAccount();

  const { osmosis, evmos } = useOsmosisData();

  const { loading, getQoute, latestQoute } = useOsmosisQoute();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [inputToken, setInputToken] = useState(evmos);
  const [outputToken, setOutputToken] = useState(osmosis);
  // why is 0.0005 ? should'nt it be 1%?
  const [currentSlippage, setCurrentSlippage] = useState(1);

  const inputTokenData = inputToken.symbol === "OSMO" ? osmosis : evmos;
  const outputTokenData = outputToken.symbol === "OSMO" ? osmosis : evmos;

  const number_min_received = parseFloat(
    formatUnits(
      BigInt(latestQoute?.return_amount?.toString() ?? "0"),
      outputTokenData.decimals
    )
  );

  const inputNumberBalance = parseFloat(
    convertAndFormat(
      BigNumber.from(inputTokenData.balance),
      inputTokenData.decimals
    )
  );

  const minReceivedAfterSlippage = number_min_received * (1 - currentSlippage);

  const [swapAmount, setSwapAmount] = useState(0);

  const debouncedFetchData = debounce(getQoute, 500); // Adjust the delay as needed
  const [isHoveringSwitchButton, setHoveringSwitchButton] = useState(false);
  return (
    <div className="relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-osmoverse-850 px-6 py-9 md:gap-6 md:px-3 w-full md:pt-4 md:pb-4">
      <SlippagePopover
        currentSlippage={currentSlippage}
        setCurrentSlippage={setCurrentSlippage}
      />
      <div className="relative flex w-full items-center justify-end"></div>
      <div className="flex flex-col gap-3">
        <div className="rounded-xl bg-osmoverse-900 px-4 py-[22px] transition-all md:rounded-xl md:px-3 md:py-2.5">
          <div className="flex place-content-between items-center transition-opacity">
            <div className="flex">
              <span className="caption text-xs text-white-full">Available</span>
              <span className="caption ml-1.5 text-xs text-wosmongton-300">
                {inputNumberBalance} {inputTokenData.symbol}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={async () => {
                  setSwapAmount(inputNumberBalance / 2);
                  await getQoute(
                    inputTokenData,
                    outputTokenData,
                    parseUnits(
                      (inputNumberBalance / 2).toString(),
                      inputTokenData.decimals
                    ).toString()
                  );
                }}
                className="flex place-content-center items-center  text-center 
              transition-colors disabled:cursor-default border 
              border-wosmongton-300 hover:border-wosmongton-200 text-wosmongton-300 hover:text-wosmongton-200 
              rounded-md disabled:border-osmoverse-600 disabled:text-osmoverse-400 h-[24px] w-auto text-caption 
              font-semibold tracking-wider py-1 px-1.5 text-xs bg-transparent"
              >
                HALF
              </button>
              <button
                onClick={async () => {
                  setSwapAmount(inputNumberBalance);
                  await getQoute(
                    inputTokenData,
                    outputTokenData,
                    parseUnits(
                      inputNumberBalance.toString(),
                      inputTokenData.decimals
                    ).toString()
                  );
                }}
                className="flex place-content-center items-center text-center transition-colors 
                disabled:cursor-default border
                 border-wosmongton-300 hover:border-wosmongton-200
                  text-wosmongton-300 hover:text-wosmongton-200 rounded-md disabled:border-osmoverse-600
                   disabled:text-osmoverse-400 h-[24px] w-auto text-caption font-semibold 
                   tracking-wider py-1 px-1.5 text-xs bg-transparent"
              >
                MAX
              </button>
            </div>
          </div>
          <div className="mt-3 flex place-content-between items-center">
            <div className="flex items-center justify-center md:justify-start">
              <div className="flex items-center gap-2 text-left transition-opacity cursor-pointer">
                <div className="mr-1 h-[50px] w-[50px] shrink-0 rounded-full md:h-7 md:w-7">
                  <Image
                    src={`/tokenIdentifier/${inputTokenData.tokenIdentifier}.png`}
                    width={50}
                    height={50}
                    alt="token icon"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="flex flex-col">
                  <h5>{inputTokenData.name}</h5>
                  <div className="md:caption w-32 text-xs truncate text-osmoverse-400">
                    {inputTokenData.chain}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-end">
              <input
                value={swapAmount}
                onChange={async (e) => {
                  setSwapAmount(Number(e.target.value));
                  await debouncedFetchData(
                    inputTokenData,
                    outputTokenData,
                    parseUnits(
                      e.target.value,
                      inputTokenData.decimals
                    ).toString()
                  );
                }}
                placeholder="0"
                type="number"
                className="w-full bg-transparent text-right text-white-full placeholder:text-white-disabled focus:outline-none md:text-subtitle1 text-h5 font-h5 md:font-subtitle1"
              />
              <span className="opacity-50 text-xs md:caption whitespace-nowrap text-osmoverse-300 transition-opacity">
                ≈ ${formatNumber(swapAmount * inputTokenData.price, 5)}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={async () => {
            setOutputToken(inputTokenData);
            setInputToken(outputTokenData);
            setSwapAmount(0);
            await debouncedFetchData(inputTokenData, outputTokenData, "0");
          }}
          className={cn(
            "absolute left-[45%] top-[220px] z-30 flex items-center transition-all duration-500 ease-bounce md:top-[174px]",
            {
              "h-10 w-10 md:h-8 md:w-8": !isHoveringSwitchButton,
              "h-11 w-11 -translate-x-[2px] md:h-9 md:w-9":
                isHoveringSwitchButton,
            }
          )}
          onMouseEnter={() => {
            setHoveringSwitchButton(true);
          }}
          onMouseLeave={() => {
            setHoveringSwitchButton(false);
          }}
        >
          <div
            className={cn("flex h-full w-full items-center rounded-full", {
              "bg-osmoverse-700": !isHoveringSwitchButton,
              "bg-[#4E477C]": isHoveringSwitchButton,
            })}
          >
            <div className="relative h-full w-full">
              <div
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-bounce",
                  {
                    "rotate-180 opacity-0": isHoveringSwitchButton,
                  }
                )}
              >
                <DownArrowIconOsmosisIcon />
              </div>
              <div
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-bounce",
                  {
                    "rotate-180 opacity-100": isHoveringSwitchButton,
                    "opacity-0": !isHoveringSwitchButton,
                  }
                )}
              >
                <SwapIcon aria-label="switch" />
              </div>
            </div>
          </div>
        </button>
        <div className="rounded-xl bg-osmoverse-900 px-4 py-[22px] transition-all md:rounded-xl md:px-3 md:py-2.5">
          <div className="flex place-content-between items-center transition-transform">
            <div className="flex items-center justify-center md:justify-start">
              <div className="flex items-center gap-2 text-left transition-opacity cursor-pointer">
                <div className="mr-1 h-[50px] w-[50px] shrink-0 rounded-full md:h-7 md:w-7">
                  <Image
                    src={`/tokenIdentifier/${outputTokenData.tokenIdentifier}.png`}
                    width={50}
                    height={50}
                    alt="token icon"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="flex flex-col">
                  <h5>{outputTokenData.symbol}</h5>
                  <div className="md:caption text-xs w-32 truncate text-osmoverse-400">
                    {outputTokenData.chain}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-end">
              <h5 className="md:subtitle1 whitespace-nowrap text-right transition-opacity text-white-full">
                ≈ {formatNumber(number_min_received, 5)}{" "}
                {outputTokenData.symbol}
              </h5>
              <span className="md:caption text-xs text-osmoverse-300 opacity-100 transition-opacity">
                ≈ $
                {formatNumber(number_min_received * outputTokenData.price, 5)}
              </span>
            </div>
          </div>
        </div>
        <div
          style={{ height: detailsOpen ? "251px" : "44px" }}
          className="relative overflow-hidden rounded-lg bg-osmoverse-900 px-4 transition-all duration-300 ease-inOutBack md:px-3 (py-6 if opened) py-[10px]"
        >
          <button
            onClick={() => {
              setDetailsOpen(!detailsOpen);
            }}
            className="flex text-sm w-full place-content-between items-center transition-opacity cursor-pointer"
          >
            {(swapAmount === 0 || number_min_received === 0) && (
              <div className="opacity-0">Loading</div>
            )}
            {swapAmount !== 0 && number_min_received !== 0 && !loading && (
              <>
                <span className="flex gap-1 transition-opacity (if amount inputed remove text color) text-osmoverse-600">
                  1<span>{inputTokenData.symbol}</span>≈{" "}
                  {formatNumber(number_min_received / swapAmount, 5)}{" "}
                  {outputTokenData.symbol}
                </span>
                <div className="flex items-center gap-2 transition-opacity">
                  {/* price impact warning ?,
                  add loading effects */}
                  <ChevronDownIconOsmosis
                    className={cn(
                      "text-osmoverse-400 transition-all",
                      detailsOpen ? "rotate-180" : "rotate-0"
                      // isEstimateDetailRelevant ? "opacity-100" : "opacity-0"
                    )}
                  />
                </div>
              </>
            )}
          </button>
          <div className="absolute text-xs flex flex-col gap-4 pt-5 transition-opacity w-[358px] md:w-[94%]">
            <div className="flex justify-between gap-1">
              <span>Price Impact</span>
              <span className="text-osmoverse-200">
                {formatNumber(latestQoute?.price_impact, 4)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Swap Fee (0.2%)</span>
              <span className="text-osmoverse-200">
                ≈ $
                {formatNumber(
                  (number_min_received * outputTokenData.price * 0.2) / 100,
                  4
                )}
              </span>
            </div>
            <hr className="text-white-faint" />
            <div className="flex justify-between gap-1">
              <span className="max-w-[140px]">Expected Output</span>
              <span className="whitespace-nowrap text-osmoverse-200">
                ≈ {formatNumber(number_min_received, 5)}{" "}
                {outputTokenData.symbol}
              </span>
            </div>
            <div className="flex justify-between gap-1">
              <span className="max-w-[140px]">
                Minimun received after slippage
              </span>
              <div className="flex flex-col gap-0.5 text-right text-osmoverse-200">
                <span className="whitespace-nowrap">
                  {formatNumber(minReceivedAfterSlippage, 5)} OSMO
                </span>
                <span>
                  ≈ $
                  {formatNumber(
                    minReceivedAfterSlippage * outputTokenData.price,
                    5
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <button className="flex w-full place-content-center items-center py-2 text-center transition-colors disabled:cursor-default border-2 border-wosmongton-700 bg-wosmongton-700 hover:border-wosmongton-400 hover:bg-wosmongton-400 rounded-xl disabled:border-2 disabled:border-osmoverse-500 disabled:bg-osmoverse-500 disabled:text-osmoverse-100 h-[56px] px-6 subtitle1 tracking-wide">
          Swap
        </button>
      </div>
    </div>
  );
}

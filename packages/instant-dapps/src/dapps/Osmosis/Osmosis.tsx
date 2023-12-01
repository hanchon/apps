"use client";
import { useState } from "react";

export default function Osmosis() {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-osmoverse-850 px-6 py-9 md:gap-6 md:px-3 w-full md:pt-4 md:pb-4">
      <div className="relative flex w-full items-center justify-end">
        <h6 className="w-full text-xl text-center">Swap</h6>
        <button className="flex place-content-center items-center text-center transition-colors disabled:cursor-default absolute top-0 right-3 z-40 w-fit py-0">
          setting
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <div className="rounded-xl bg-osmoverse-900 px-4 py-[22px] transition-all md:rounded-xl md:px-3 md:py-2.5">
          <div className="flex place-content-between items-center transition-opacity">
            <div className="flex">
              <span className="caption text-xs text-white-full">Available</span>
              <span className="caption ml-1.5 text-xs text-wosmongton-300">
                0 ATOM
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="flex w-full place-content-center items-center py-2 text-center transition-colors disabled:cursor-default border bg-transparent border-wosmongton-300 hover:border-wosmongton-200 text-wosmongton-300 hover:text-wosmongton-200 rounded-md disabled:border-osmoverse-600 disabled:text-osmoverse-400 h-[24px] px-2 py-1 w-auto text-caption font-semibold tracking-wider py-1 px-1.5 text-xs bg-transparent">
                HALF
              </button>
              <button className="flex w-full place-content-center items-center py-2 text-center transition-colors disabled:cursor-default border bg-transparent border-wosmongton-300 hover:border-wosmongton-200 text-wosmongton-300 hover:text-wosmongton-200 rounded-md disabled:border-osmoverse-600 disabled:text-osmoverse-400 h-[24px] px-2 py-1 w-auto text-caption font-semibold tracking-wider py-1 px-1.5 text-xs bg-transparent">
                MAX
              </button>
            </div>
          </div>
          <div className="mt-3 flex place-content-between items-center">
            <div className="flex items-center justify-center md:justify-start">
              <div className="flex items-center gap-2 text-left transition-opacity cursor-pointer">
                <div className="mr-1 h-[50px] w-[50px] shrink-0 rounded-full md:h-7 md:w-7">
                  <img
                    src="/"
                    width={50}
                    height={50}
                    alt="token icon"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="flex flex-col">
                  <h5>ATOM</h5>
                  <div className="md:caption w-32 text-xs truncate text-osmoverse-400">
                    Cosmos Hub
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-end">
              <input
                placeholder="0"
                type="number"
                className="w-full bg-transparent text-right text-white-full placeholder:text-white-disabled focus:outline-none md:text-subtitle1 text-h5 font-h5 md:font-subtitle1"
              />
              <span className="opacity-50 text-xs md:caption whitespace-nowrap text-osmoverse-300 transition-opacity">
                ≈ $0
              </span>
            </div>
          </div>
        </div>
        <button className="absolute left-[45%] top-[210px] z-30 flex items-center transition-all duration-500 ease-bounce md:top-[165px] h-10 w-10 md:h-8 md:w-8">
          <div className="flex h-full w-full items-center rounded-full bg-osmoverse-700">
            <div className="relative h-full w-full">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-bounce"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-bounce opacity-0"></div>
            </div>
          </div>
        </button>
        <div className="rounded-xl bg-osmoverse-900 px-4 py-[22px] transition-all md:rounded-xl md:px-3 md:py-2.5">
          <div className="flex place-content-between items-center transition-transform">
            <div className="flex items-center justify-center md:justify-start">
              <div className="flex items-center gap-2 text-left transition-opacity cursor-pointer">
                <div className="mr-1 h-[50px] w-[50px] shrink-0 rounded-full md:h-7 md:w-7">
                  <img
                    src="/"
                    width={50}
                    height={50}
                    alt="token icon"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="flex flex-col">
                  <h5>OSMO</h5>
                  <div className="md:caption text-xs w-32 truncate text-osmoverse-400">
                    Osmosis
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-end">
              <h5 className="md:subtitle1 whitespace-nowrap text-right transition-opacity text-white-full">
                ≈ 429.38571
              </h5>
              <span className="md:caption text-xs text-osmoverse-300 opacity-100 transition-opacity">
                ≈ $297
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
            <span className="flex gap-1 transition-opacity (if amount inputed remove text color) text-osmoverse-600">
              1<span>ATOM</span>≈ 13.54126 OSMO
            </span>
            <div className="flex items-center gap-2 transition-opacity">
              chevron-down
            </div>
          </button>
          <div className="absolute text-xs flex flex-col gap-4 pt-5 transition-opacity w-[358px] md:w-[94%]">
            <div className="flex justify-between gap-1">
              <span>Price Impact</span>
              <span className="text-osmoverse-200">-0.0002%</span>
            </div>
            <div className="flex justify-between">
              <span>Swap Fee (0.2%)</span>
              <span className="text-osmoverse-200">≈ $0.03</span>
            </div>
            <hr className="text-white-faint" />
            <div className="flex justify-between gap-1">
              <span className="max-w-[140px]">Expected Output</span>
              <span className="whitespace-nowrap text-osmoverse-200">
                ≈ 26.949881 OSMO
              </span>
            </div>
            <div className="flex justify-between gap-1">
              <span className="max-w-[140px]">
                Minimun received after slippage
              </span>
              <div className="flex flex-col gap-0.5 text-right text-osmoverse-200">
                <span className="whitespace-nowrap">26.6794951 OSMO</span>
                <span>≈ $18.4</span>
              </div>
            </div>
            {/* <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span>

                                </span>
                            </div>
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

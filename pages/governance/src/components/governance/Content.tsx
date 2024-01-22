// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

import { COMMONWEALTH_URL } from "constants-helper";
import { useProposals } from "../../utils/hooks/useProposals";
import BannerBlack from "../common/banners/BannerBlack";

import { cosmos } from "helpers/src/clients/cosmos";
import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import {
  QueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { get } from "lodash-es";
import { safeBigInt } from "helpers/src/bigint/safe-bigint";
import { divide } from "helpers/src/bigint";

import { BannerMessages } from "@evmosapps/ui-helpers";

import { ErrorBoundary } from "react-error-boundary";
import { ContainerProposals } from "./proposals/ContainerProposals";

const Proposals = () => {
  const chainRef = useEvmosChainRef();

  const { data: proposals } = useSuspenseQuery({
    queryKey: ["proposals"],
    queryFn: () =>
      cosmos(chainRef)
        .GET("/cosmos/gov/v1/proposals", {
          params: {
            query: {
              "pagination.limit": "2",
              "pagination.reverse": true,
            },
          },
        })
        .then((res) => res.data),
  });
  const asPercentage = <T extends string[]>(...args: T) => {
    const asBigInt = args.map((arg) => safeBigInt(arg));
    const total = asBigInt.reduce((acc, curr) => acc + curr, 0n);

    if (total === 0n)
      return asBigInt.map(() => 0) as { [K in keyof T]: number };
    return asBigInt.map((arg) => divide(arg, total)) as {
      [K in keyof T]: number;
    };
  };
  return (
    <div>
      {proposals?.proposals?.map(
        ({
          title,
          messages,
          final_tally_result: {
            abstain_count = "0",
            no_count = "0",
            no_with_veto_count = "0",
            yes_count = "0",
          } = {},
        }) => {
          const [yes, no, noWithVeto, abstain] = asPercentage(
            yes_count,
            no_count,
            no_with_veto_count,
            abstain_count,
          );

          return (
            <div className="flex h-full cursor-pointer flex-col justify-between space-y-5 rounded-2xl bg-darkGray2 p-5 transition-all duration-300 hover:bg-darkGray2Opacity">
              {title || get(messages, "0.title")}
              <div className="bg-darkGray1 flex h-4 w-full overflow-hidden rounded-lg">
                {" "}
              </div>
              <div className="flex justify-between">
                <div className="flex items-center space-x-2 font-display text-sm">
                  <div className="bg-green h-4 w-4 rounded-lg"></div>
                  <div className="text-pearl font-bold opacity-80">
                    <p>Yes</p>
                    <p>{(yes * 100).toFixed(2)}%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 font-display text-sm">
                  <div className="bg-red h-4 w-4 rounded-lg"></div>
                  <div className="text-pearl font-bold opacity-80">
                    <p>No</p>
                    <p>{(no * 100).toFixed(2)}%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 font-display text-sm">
                  <div className="bg-darkGray5 h-4 w-4 rounded-lg"></div>
                  <div className="text-pearl font-bold opacity-80">
                    <p>Abstain</p>
                    <p>{(abstain * 100).toFixed(2)}%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 font-display text-sm">
                  <div className="bg-yellow h-4 w-4 rounded-lg"></div>
                  <div className="text-pearl font-bold opacity-80">
                    <p>No With Veto</p>
                    <p>{(noWithVeto * 100).toFixed(2)}%</p>
                  </div>
                </div>
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};

const Content = () => {
  // const searchParams = useSearchParams();
  // const id = searchParams?.get("id");

  // const { proposals, loading, error, proposalDetail } = useProposals(
  //   id ?? undefined,
  // );
  return (
    <div>
      {/* {(id === null || id === undefined) && ( */}
      <BannerBlack
        text="Have you ever wondered where proposals come from? Join us in our open
          and lively discussions over at Commonwealth"
        href={COMMONWEALTH_URL}
      />
      {/* )} */}

      <div className="mt-5 w-full text-pearl">
        <ErrorBoundary
          fallbackRender={(e) => {
            console.log(e);
            return <BannerMessages text={"No results"} />;
          }}
        >
          <Suspense
            fallback={<BannerMessages text="Loading..." spinner={true} />}
          >
            <ContainerProposals />
          </Suspense>
        </ErrorBoundary>

        {/* {id && (
          <ContentProposal
            proposalDetail={proposalDetail}
            loading={loading}
            error={error}
          />
        )} */}
      </div>
    </div>
  );
};

export default Content;

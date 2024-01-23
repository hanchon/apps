// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use client";

import { Suspense } from "react";
import { BannerMessages } from "@evmosapps/ui-helpers";
import { ErrorBoundary } from "react-error-boundary";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
const ContentProposal = dynamic(
  () =>
    import("./components/governance/proposalPage/ContentProposal").then(
      (mod) => mod.ContentProposal,
    ),
  { ssr: false },
);
export const ProposalPage = ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const proposalId = id.split("-")[0] ?? notFound();

  return (
    <div>
      <div className="mt-5 w-full text-pearl">
        <ErrorBoundary
          fallbackRender={() => {
            return <BannerMessages text={"No results"} />;
          }}
        >
          <Suspense
            fallback={<BannerMessages text="Loading..." spinner={true} />}
          >
            <ContentProposal proposalId={proposalId} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

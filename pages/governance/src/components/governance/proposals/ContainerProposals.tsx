// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useCallback } from "react";

import { BannerMessages, TrackerEvent } from "@evmosapps/ui-helpers";
import ProposalCard from "./ProposalCard";
import { CLICK_GOVERNANCE_PROPOSAL } from "tracker";
import { Link } from "@evmosapps/i18n/client";
import { ProposalProps } from "../../../utils/types";
import { useAccount } from "wagmi";
import { getActiveProviderKey } from "@evmosapps/evmos-wallet";

const ContainerProposals = ({
  proposals,
  loading,
  error,
}: {
  proposals: ProposalProps[];
  loading: boolean;
  error: unknown;
}) => {
  const { address } = useAccount();
  const activeProviderKey = getActiveProviderKey();
  const drawProposals = useCallback(() => {
    if (loading) {
      return <BannerMessages text="Loading..." spinner={true} />;
    }
    if (error) {
      return <BannerMessages text="No results" />;
    }
    return proposals.map((proposal) => {
      return (
        <TrackerEvent
          key={proposal.id}
          event={CLICK_GOVERNANCE_PROPOSAL}
          properties={{
            "User Wallet Address": address,
            "Wallet Provider": activeProviderKey,
            "Governance Proposal": proposal.id,
          }}
        >
          <Link href={`/governance?id=${proposal.id}`} data-testid="proposal">
            <ProposalCard proposalProps={proposal} />
          </Link>
        </TrackerEvent>
      );
    });
  }, [proposals, loading, error, address, activeProviderKey]);

  return (
    <section className="grid grid-flow-row grid-cols-1 gap-4 px-4 md:px-0 lg:grid-cols-2">
      {drawProposals()}
    </section>
  );
};

export default ContainerProposals;

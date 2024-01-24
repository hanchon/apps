// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useUserVote } from "../../../utils/hooks/useVote";

export const UserVote = ({ proposalId }: { proposalId: string }) => {
  const { data } = useUserVote(proposalId);
  if (!data?.vote) {
    return null;
  }

  return (
    <p className="rounded-3xl bg-pearl px-5 py-2 text-center text-black ">{`You Voted: ${data.vote}`}</p>
  );
};

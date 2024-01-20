// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import { useQuery } from "@tanstack/react-query";
import { cosmos } from "helpers/src/clients/cosmos";

export const useEpochDay = () => {
  const chainRef = useEvmosChainRef();
  const { data, error } = useQuery({
    queryKey: ["epochs", chainRef],
    queryFn: () =>
      cosmos(chainRef)
        .GET("/evmos/epochs/v1/epochs")
        .then(({ data }) => {
          return Date.parse(
            data?.epochs?.find(({ identifier }) => identifier === "day")
              ?.current_epoch_start_time ?? "",
          );
        }),
  });

  return { epochs: data ?? 0, error: error };
};

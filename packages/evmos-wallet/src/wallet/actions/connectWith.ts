// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { connect, disconnect } from "wagmi/actions";
import { ConnetorId, wagmiConfig } from "../wagmi";
import { E, raise } from "helpers";

export async function connectWith(provider: ConnetorId) {
  await E.try(() => disconnect(wagmiConfig));
  return connect(wagmiConfig, {
    connector:
      wagmiConfig.connectors.find((c) => c.name === provider) ??
      raise("Invalid provider"),
  });
}

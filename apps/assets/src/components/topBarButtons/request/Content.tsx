// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import React from "react";
import { useTranslation } from "next-i18next";

import {
  getPrefixes,
  isValidCosmosAddress,
  isValidHexAddress,
} from "evmos-wallet";
import { useModalState } from "../hooks/useModal";
import { SendIcon } from "icons";
import { z } from "zod";
import {
  ChainPrefixSchema,
  MinDenomSchema,
} from "evmos-wallet/src/registry-actions/utils";

import { ShareContent } from "./ShareContent";
import { SetUpContent } from "./SetupContent";
import { ReceiveContent } from "./ReceiveContent";


const TransferModalSchema = z.object({
  receiver: z.string().transform((v) => {
    if (isValidHexAddress(v) || isValidCosmosAddress(v, [...getPrefixes()])) {
      return v;
    }
    return undefined;
  }),
  chainPrefix: ChainPrefixSchema,
  denom: MinDenomSchema,
  amount: z.coerce.bigint().default(0n),
  step: z.union([z.literal("setup"), z.literal("share"), z.literal("receive")]),
});

export const Content = () => {
  const {
    state: { step, receiver, ...token },
    setState,
  } = useModalState("request", TransferModalSchema, {
    chainPrefix: "evmos",
    denom: "aevmos",
    amount: 0n,
    step: "receive"
  });
  const [message, setMessage] = React.useState("");

  return (
    <section className="space-y-3">
      {step === "share" &&
        <ShareContent setState={setState} message={message} token={token} />
      }
      {step === "setup" &&
        <SetUpContent setState={setState} setMessage={setMessage} message={message} token={token} />
      }
      {
        step === "receive" &&
        <ReceiveContent setState={setState} />
      }
    </section>
  );
};

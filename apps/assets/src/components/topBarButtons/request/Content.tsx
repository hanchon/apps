// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import React from "react";
import { RequestModalProps } from "./RequestModal";

import { ShareContent } from "./ShareContent";
import { SetUpContent } from "./SetupContent";
import { ReceiveContent } from "./ReceiveContent";

export const Content = ({
  denom,
  amount,
  tokenSourcePrefix,
  setState,
  step
}: RequestModalProps) => {

  const [message, setMessage] = React.useState("");

  const token = {
    denom: denom,
    amount: amount,
    chainPrefix: tokenSourcePrefix,
    tokenSourcePrefix: tokenSourcePrefix,
    networkPrefix: tokenSourcePrefix
  }

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

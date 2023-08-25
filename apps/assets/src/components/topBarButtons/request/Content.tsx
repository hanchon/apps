// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useState } from "react";
import { Input, Subtitle, TokenCard } from "ui-helpers";
export const Content = () => {
  const [input, setInput] = useState("");
  return (
    <section className="space-y-3">
      <Subtitle>Payment Requested to</Subtitle>
      <Input
        placeholder="Request receipient's address"
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInput(e.target.value);
        }}
      />
      <Subtitle>Asset and amount to request</Subtitle>
      <TokenCard />
    </section>
  );
};

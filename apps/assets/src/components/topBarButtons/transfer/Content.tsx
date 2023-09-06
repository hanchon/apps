// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import React from "react";
import { Subtitle, Title } from "ui-helpers";
import { useTranslation } from "next-i18next";
import { Prefix, TokenMinDenom } from "evmos-wallet/src/registry-actions/types";
import { AssetSelector } from "./parts/AssetSelector";
import { useAccount } from "wagmi";
import { Address, normalizeToCosmosAddress } from "evmos-wallet";
import { AccountSelector } from "./parts/AccountSelector";
import { useURLState } from "./hooks/useURLState";
import { TransferSummary } from "./parts/TransferSummary";
import { SendIcon } from "icons";
export const Content = () => {
  const { t } = useTranslation();

  const [{ receiver, denom, ...rest }, setState] = useURLState<{
    action: "TRANSFER";
    receiver?: Address<Prefix>;
    denom: TokenMinDenom;
    amount: string;
  }>({
    action: "TRANSFER",
    denom: "aevmos",
    amount: "0",
  });

  const account = useAccount();
  const amount = BigInt(rest.amount);
  const sender = account.address
    ? normalizeToCosmosAddress(account.address)
    : undefined;

  return (
    <section className="space-y-3">
      <Title variant="modal-black" icon={<SendIcon />}>
        {t("transfer.title")}
      </Title>

      <form>
        <section>
          <Subtitle variant="modal-black">
            {t("transfer.section.asset")}
          </Subtitle>
          <AssetSelector
            value={{ denom, amount }}
            onChange={({ denom, amount }) =>
              setState((prev) => ({
                ...prev,
                denom,
                amount: amount.toString(),
              }))
            }
          />

          <Subtitle variant="modal-black">{t("transfer.section.to")}</Subtitle>
          <AccountSelector
            value={receiver}
            onChange={(receiver) => setState((prev) => ({ ...prev, receiver }))}
          />

          {sender && receiver && (
            <>
              <h2 className="text-gray-300 text-xs font-bold">Sending</h2>
              <TransferSummary
                sender={sender}
                receiver={receiver}
                token={{ denom, amount }}
              />
            </>
          )}
        </section>
      </form>
    </section>
  );
};

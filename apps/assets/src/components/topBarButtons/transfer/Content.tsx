// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import React, { useEffect } from "react";
import { Label, Subtitle, Title } from "ui-helpers";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Prefix, TokenMinDenom } from "evmos-wallet/src/registry-actions/types";
import { AssetSelector } from "./parts/AssetSelector";
import { useAccount } from "wagmi";
import {
  Address,
  connectWith,
  getPrefixes,
  getTokenMinDenomList,
  isValidCosmosAddress,
  isValidHexAddress,
  usePrepareTransfer,
} from "evmos-wallet";
import { AccountSelector } from "./parts/AccountSelector";
import { useModalState } from "./hooks/useModal";
import { TransferSummary } from "./parts/TransferSummary";
import { SendIcon } from "icons";
import { z } from "zod";
import { chains } from "@evmos-apps/registry";
import { E } from "helpers";
import { useAccountByPrefix } from "./hooks/useAccountByPrefix";
import { formatUnits } from "viem";

const TransferModalSchema = z.object({
  receiver: z.string().transform((v) => {
    if (isValidHexAddress(v) || isValidCosmosAddress(v, [...getPrefixes()])) {
      return v;
    }
    return undefined;
  }),
  chainPrefix: z.custom<Prefix>((v) => {
    if (Object.keys(chains).includes(v as Prefix)) {
      return v;
    }
    return undefined;
  }),
  denom: z.custom<TokenMinDenom>((v) => {
    if (getTokenMinDenomList().includes(v as TokenMinDenom)) {
      return v;
    }
    return undefined;
  }),
  amount: z.coerce.bigint().default(0n),
});

export const Content = () => {
  const { t } = useTranslation();

  const {
    state: { receiver, ...token },
    setState,
  } = useModalState("transfer", TransferModalSchema, {
    chainPrefix: "evmos",
    denom: "aevmos",
    amount: 0n,
  });

  const { connector } = useAccount();
  const { data, error, refetch } = useAccountByPrefix(token.chainPrefix);

  const sender = data?.bech32Address;

  // In progress:
  // const { data: preparedTransaction } = usePrepareTransfer({
  //   sender,
  //   receiver,
  //   token,
  // });
  //  {preparedTransaction &&
  //       formatUnits(preparedTransaction.fee.amount, 18)}
  return (
    <section className="space-y-3">
      <Title variant="modal-black" icon={<SendIcon />}>
        {t("transfer.title")}
      </Title>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <section>
          <Subtitle variant="modal-black">
            {t("transfer.section.asset")}
          </Subtitle>
          <AssetSelector
            value={token}
            address={sender}
            onChange={(token) =>
              setState((prev) => ({
                ...prev,
                ...token,
              }))
            }
          />

          {/* TODO: Some error messages. This is not in the specs, so we need to check with Mian how to display those */}
          {E.match.byPattern(error, /USER_REJECTED_REQUEST/) && (
            <div className="text-center space-y-2">
              <p>
                I see you're trying to send tokens from{" "}
                <strong>{chains[token.chainPrefix].name}</strong> using{" "}
                {connector?.name}.
              </p>
              <p>
                For that we need access to your account address. If you want to
                proceed with this transaction, please authorize the request in
                your wallet.
              </p>
              <button
                className="bg-gray-500 text-white rounded-md px-3 py-2"
                onClick={() => refetch()}
              >
                Try again
              </button>
            </div>
          )}
          {E.match.byPattern(error, /NETWORK_NOT_SUPPORTED_BY_WALLET/) && (
            <div className="text-center space-y-2">
              <p>
                I see you're trying to send tokens from{" "}
                <strong>{chains[token.chainPrefix].name}</strong> using{" "}
                {connector?.name}.
              </p>
              <p>
                Currently, only Keplr supports supports sending tokens from
                other networks than Evmos.
              </p>
              <button
                className="bg-gray-500 text-white rounded-md px-3 py-2"
                onClick={() => connectWith("keplr")}
              >
                Connect with Keplr
              </button>
            </div>
          )}

          <Subtitle variant="modal-black">{t("transfer.section.to")}</Subtitle>
          <AccountSelector
            value={receiver}
            onChange={(receiver) => setState((prev) => ({ ...prev, receiver }))}
          />

          {sender && receiver && (
            <div className="space-y-3">
              <Label>{t("transfer.section.summary.title")}</Label>
              <TransferSummary
                sender={sender}
                receiver={receiver}
                token={token}
              />
            </div>
          )}
        </section>
      </form>
    </section>
  );
};

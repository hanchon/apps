// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import React, { useEffect, useState } from "react";
import {
  CryptoSelector,
  CryptoSelectorBalanceBox,
  CryptoSelectorBalanceText,
  CryptoSelectorDropdownBox,
  CryptoSelectorTitle,
  ErrorMessage,
  Label,
  PrimaryButton,
  Subtitle,
  TextInput,
  Title,
} from "ui-helpers";
import { useTranslation } from "next-i18next";
import { FormattedBalance, Prefix, TokenMinDenom } from "evmos-wallet/src/registry-actions/types";
import { AssetSelector } from "../parts/AssetSelector";
import { useAccount } from "wagmi";
import {
  Address,
  connectWith,
  getPrefixes,
  getTokenByMinDenom,
  getTokenMinDenomList,
  isValidCosmosAddress,
  isValidHexAddress,
  useAccountBalances,
  useTokenBalance,
} from "evmos-wallet";
import { useModalState } from "../hooks/useModal";
import { CopyIcon, CopyPasteIcon, SendIcon } from "icons";
import { z } from "zod";
import { chains } from "@evmos-apps/registry";
import { E } from "helpers";
import { useWalletAccountByPrefix } from "../hooks/useAccountByPrefix";
import Image from "next/image";
import { formatUnits } from "viem";
import { tokenToUSD } from "../common/utils";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { useSearchParams } from 'next/navigation'
import { formatProviderAddress, truncateAddress } from "evmos-wallet/src/internal/wallet/style/format";
import { AmountBox } from "../common/AmountBox";
import { StoreType, WalletConnection, useAssets } from "evmos-wallet";
import { Dispatch, SetStateAction } from "react";
import { CopilotButton, StepsContextProvider, steps } from "copilot";
import { useDispatch, useSelector } from "react-redux";
import { getChainByTokenDenom } from "evmos-wallet/src/registry-actions/get-chain-by-token-min-denom";

const MAX_MESSAGE_LENGTH = 140;

const TransferModalSchema = z.object({
  requester: z.string().transform((v) => {
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
  step: z.union([z.literal("payment"), z.literal("result")]),
  message: z.string().max(MAX_MESSAGE_LENGTH).default(""),
});

export const Content = () => {
  const searchParams = useSearchParams()
  const dispatch = useDispatch();
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const { t } = useTranslation();
  const {
    state: { requester, message, step, ...token },
    setState,
  } = useModalState("pay", TransferModalSchema, {
    step: "payment",
    requester: searchParams.get("requester") as Address<Prefix> ?? "",
    chainPrefix: searchParams.get("chainPrefix") as Prefix ?? "evmos",
    denom: searchParams.get("denom") as TokenMinDenom ?? "aphoton",
    amount: BigInt(searchParams.get("amount") ?? 0),
    message: searchParams.get("message") ?? "",
  });

  const { connector, isConnected, address } = useAccount();
  const { data } = useWalletAccountByPrefix(token.chainPrefix);
  const { data: evmosData } = useWalletAccountByPrefix("evmos");
  const sender = connector?.id === "metaMask" ? wallet.evmosAddressCosmosFormat as Address<Prefix> : data?.bech32Address;

  const [selectedBalance, setSelectedBalance] = useState<undefined | FormattedBalance>()

  const price = useTokenPrice(token.denom);
  const selectedToken = getTokenByMinDenom(token.denom);
  const amountInUsd = price
    ? tokenToUSD(token.amount, Number(price), selectedToken.decimals)
    : null;

  const selectedTokenUSD = selectedToken ? tokenToUSD(token.amount, Number(price), selectedToken.decimals) : null

  const { balance } = useTokenBalance(sender, token.denom);
  const { balance: evmosBalance } = useTokenBalance(evmosData?.bech32Address, token.denom);

  const balances = sender === evmosData?.bech32Address ? [evmosBalance] : [balance, evmosBalance].filter(b => b !== undefined)
  const chain = getChainByTokenDenom(token.denom)
  // const tokenBalances = balances?.filter(b => {
  //   b.
  // })

  const insufficientBalance = selectedBalance?.value ?? 0n < token.amount ? true : false



  console.log("balances", balances, sender === evmosData?.bech32Address, sender, evmosData?.bech32Address)

  return (
    <section className="space-y-3">
      <Title variant="modal-black" icon={<SendIcon />}>
        {t("pay.title")}
      </Title>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <section>
          <div className="flex gap-5 flex-col">

            <div className="flex gap-2 flex-col">
              <div className="flex h-28 rounded-md bg-gray-500 py-2 px-4 items-center justify-between">
                {message}
              </div>
              <div className="flex text-sm justify-end gap-1">
                <span className="text-gray-400">
                  from:
                </span>
                <span className="text-red font-semibold">
                  {truncateAddress(requester)}
                </span>
              </div>
            </div>
            <AmountBox
              amount={token.amount}
              token={selectedToken}
              amountInUsd={amountInUsd}
            />

            {
              !isConnected &&
              <WalletConnection
                copilotModal={({
                  beforeStartHook,
                }: {
                  beforeStartHook: Dispatch<SetStateAction<boolean>>;
                }) => <CopilotButton beforeStartHook={beforeStartHook} />}
                dispatch={dispatch}
                walletExtension={wallet}
              />

            }

            {isConnected &&

              <>
                <CryptoSelectorDropdownBox>

                  <CryptoSelector

                    value={selectedBalance?.type ?? ""}
                    onChange={(type) => {
                      setSelectedBalance(balances?.find(b => b?.type === type))
                    }
                    }

                  >

                    <CryptoSelector.Button
                    >
                      <span className="pl-2">

                      </span>
                    </CryptoSelector.Button>

                    <CryptoSelector.Options
                      variant="wide"
                      className="left-0"
                      label={t("transfer.section.token.label")}
                    >
                      {balances.map((b) => {
                        return (
                          <CryptoSelector.Option
                            src={`/assets/tokens/${selectedToken.denom}.png`}
                            key={b?.address}
                            value={b?.type ?? ""}
                          >
                            {b?.type === "ERC20" ? "Evmos" : chain.name} - {formatUnits(b?.value ?? 0n, b?.decimals ?? 0)} {selectedToken?.denom?.toLocaleUpperCase()}
                          </CryptoSelector.Option>
                        );
                      })}
                    </CryptoSelector.Options>
                  </CryptoSelector>
                </CryptoSelectorDropdownBox>
                {
                  selectedBalance &&

                  <div className={`flex flex-col gap-2`}>
                    <span className="font-medium">
                      Your Balance
                    </span>
                    <div className="rounded p-2 border border-pink-300" >
                      <div className={`flex justify-between  ${insufficientBalance ? "opacity-60" : ""}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{formatUnits(selectedBalance?.value ?? 0n, selectedBalance?.decimals ?? 0)}

                          </span><span className="text-gray-300 text-xs">≈ {selectedTokenUSD}</span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {selectedBalance?.type === "ERC20" ? "Evmos" : chain.name}
                        </span>
                        <span className="text-xs text-gray-400">

                        </span>
                      </div>
                    </div>
                    {insufficientBalance &&
                      <span className="text-xs text-red-900 font-bold">
                        Insuficient Balance
                      </span>
                    }

                  </div>

                }


                <PrimaryButton
                  disabled={false}
                  // TODO: change variant to outline-primary if the user doesn't have enough balance to pay the fee
                  variant={false ? "outline-primary" : undefined}
                  onClick={() => {
                  }}
                  className="w-full text-lg rounded-md capitalize mt-5"
                // TODO: we should change the message and the action depending if the user has enought balance to pay the fee or if we have to redirect them to axelar page
                // "transfer.swap.button.text" - "transfer.bridge.button.text"
                >
                  {
                    t("request.generate.button")}
                </PrimaryButton>
              </>
            }
          </div>

        </section>

      </form>


    </section>
  );
};

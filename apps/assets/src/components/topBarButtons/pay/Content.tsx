// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import React, { useEffect, useState } from "react";
import {
  CryptoSelector,
  CryptoSelectorDropdownBox,
  PrimaryButton,
  Title,
} from "ui-helpers";
import { useTranslation } from "next-i18next";
import { FormattedBalance, Prefix } from "evmos-wallet/src/registry-actions/types";
import { useAccount } from "wagmi";
import {
  Address,
  getTokenByMinDenom,
  useTokenBalance,
} from "evmos-wallet";

import { useWalletAccountByPrefix } from "../hooks/useAccountByPrefix";
import { formatUnits } from "viem";
import { tokenToUSD } from "../common/utils";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { useSearchParams } from 'next/navigation'
import { truncateAddress } from "evmos-wallet/src/internal/wallet/style/format";
import { AmountBox } from "../common/AmountBox";
import { StoreType, WalletConnection } from "evmos-wallet";
import { Dispatch, SetStateAction } from "react";
import { CopilotButton } from "copilot";
import { useDispatch, useSelector } from "react-redux";
import { PayModalProps } from "./Modal";
import { getChainByAddress } from "evmos-wallet/src/registry-actions/get-chain-by-account";
import { chains } from "@evmos-apps/registry";
import { PayIcon } from "icons";
import Image from "next/image";



export const Content = ({ requester, networkPrefix, denom, amount, step, message, setState }: PayModalProps) => {
  const searchParams = useSearchParams()
  const dispatch = useDispatch();
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const { t } = useTranslation();

  const token = {
    chainPrefix: networkPrefix,
    denom: denom,
    amount: amount,
    minCoinDenom: denom,
    sourcePrefix: networkPrefix
  }
  const selectedToken = getTokenByMinDenom(token.denom);
  const { connector, isConnected, address } = useAccount();
  const { data } = useWalletAccountByPrefix(selectedToken.sourcePrefix);
  const { data: evmosData } = useWalletAccountByPrefix("evmos");
  const sender = connector?.id === "metaMask" ? wallet.evmosAddressCosmosFormat as Address<Prefix> : data?.bech32Address;

  const [selectedBalance, setSelectedBalance] = useState<undefined | FormattedBalance>({
    decimals: 16,
    value: 0n,
    type: "ERC20",
    tokenSourcePrefix: "evmos",
    minDenom: "aevmos",
    address: "evmos1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3z33a4",
    formatted: "0.0000000000000000",
    formattedLong: "0.000000000000000000",
    denom: "EVMOS",
  })

  const price = useTokenPrice(token.denom);

  const amountInUsd = price
    ? tokenToUSD(token.amount, Number(price), selectedToken.decimals)
    : null;

  const selectedTokenUSD = selectedToken ? tokenToUSD(selectedBalance?.value ?? 0n, Number(price), selectedToken.decimals) : null

  const { balance } = useTokenBalance(sender, token);
  const { balance: evmosBalance } = useTokenBalance(evmosData?.bech32Address, token);
  const balances = sender === evmosData?.bech32Address ? [evmosBalance].filter(b => b !== undefined) : [balance, evmosBalance].filter(b => b !== undefined)
  const chain = sender ? getChainByAddress(sender) : chains["evmos"];

  const insufficientBalance = selectedBalance?.value ?? 0n < token.amount ? true : false

  useEffect(() => {
    if (balances.length > 0 && selectedBalance?.address === "evmos1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3z33a4") {
      setSelectedBalance(balances[0])
    }
  }, [balances])

  return (
    <section className="space-y-3">
      <Title variant="modal-black" icon={<PayIcon />}>
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
                    }}
                  >
                    <CryptoSelector.Button
                    >
                      <div className="pl-2 items-center flex gap-1.5">
                        <Image
                          src={`/assets/chains/${selectedBalance?.type === "ERC20" ? "evmos" : selectedBalance?.denom}.png`}
                          className="rounded-full"
                          alt=""
                          width={24}
                          height={24}
                        />
                        {selectedBalance?.type === "ERC20" ? "Evmos" : chain.name}
                      </div>
                    </CryptoSelector.Button>

                    <CryptoSelector.Options
                      variant="wide"
                      className="left-0"
                      label={t("transfer.section.token.label")}
                    >
                      {balances.map((b) => {
                        return (
                          <CryptoSelector.Option
                            src={`/assets/tokens/${b?.type === "ERC20" ? "evmos" : selectedBalance?.denom}.png`}
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
                          <span className="text-sm">
                            {formatUnits(selectedBalance?.value ?? 0n, selectedBalance?.decimals ?? 0)} {selectedToken?.denom}
                          </span>
                          <span className="text-gray-300 text-xs">
                            ≈ {selectedTokenUSD}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {selectedBalance?.type === "ERC20" ? "Evmos" : chain.name}
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

                {!insufficientBalance &&
                  <PrimaryButton
                    disabled={insufficientBalance}
                    // TODO: change variant to outline-primary if the user doesn't have enough balance to pay the fee
                    variant={false ? "outline-primary" : undefined}
                    onClick={() => {
                    }}
                    className="w-full text-lg rounded-md capitalize mt-5"
                  // TODO: we should change the message and the action depending if the user has enought balance to pay the fee or if we have to redirect them to axelar page
                  // "transfer.swap.button.text" - "transfer.bridge.button.text"
                  >
                    {
                      t("pay.button")}
                  </PrimaryButton>

                }

                {insufficientBalance &&
                  <PrimaryButton
                    disabled={false}
                    // TODO: change variant to outline-primary if the user doesn't have enough balance to pay the fee
                    variant={"outline-primary"}
                    onClick={() => {
                    }}
                    className="w-full text-lg rounded-md capitalize mt-5"
                  // TODO: we should change the message and the action depending if the user has enought balance to pay the fee or if we have to redirect them to axelar page
                  // "transfer.swap.button.text" - "transfer.bridge.button.text"
                  >
                    {
                      t("pay.swap.button")}
                  </PrimaryButton>

                }


              </>
            }
          </div>

        </section>

      </form>


    </section>
  );
};

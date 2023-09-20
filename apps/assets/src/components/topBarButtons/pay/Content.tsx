// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import React, { useEffect, useState } from "react";
import {
  CryptoSelector,
  CryptoSelectorDropdownBox,
  PrimaryButton,
  Subtitle,
  Title,
} from "ui-helpers";
import { useTranslation } from "next-i18next";
import {
  FormattedBalance,
  Prefix,
} from "evmos-wallet/src/registry-actions/types";
import { useAccount } from "wagmi";
import {
  Address,
  useTokenBalance,
} from "evmos-wallet";

import { useWalletAccountByPrefix } from "../hooks/useAccountByPrefix";
import { formatUnits } from "viem";
import { tokenToUSD } from "../common/utils";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { useSearchParams } from "next/navigation";
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
import {
  CLICK_ON_PAY,
  CLICK_ON_SWAP_ASSETS_PAY_FLOW,
  SELECT_NETWORK_PAY_FLOW,
} from "tracker/src/constants";
import { useTracker } from "tracker";
import { getTokenByRef } from "evmos-wallet/src/registry-actions/get-token-by-ref";

export const Content = ({
  requester,
  token,
  amount,
  message,
}: PayModalProps) => {
  const dispatch = useDispatch();
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const { t } = useTranslation();
  const { sendEvent } = useTracker();

  const selectedToken = getTokenByRef(token);
  const { connector, isDisconnected } = useAccount();
  const { data } = useWalletAccountByPrefix(selectedToken.sourcePrefix);
  const { data: evmosData } = useWalletAccountByPrefix("evmos");
  const sender =
    connector?.id === "metaMask"
      ? (wallet.evmosAddressCosmosFormat as Address<Prefix>)
      : data?.bech32Address;

  const [selectedBalance, setSelectedBalance] = useState<
    undefined | FormattedBalance
  >(undefined);

  const price = useTokenPrice(token);

  const amountInUsd = price
    ? tokenToUSD(amount, Number(price), selectedToken.decimals)
    : null;

  const selectedTokenUSD = selectedToken
    ? tokenToUSD(
      selectedBalance?.value ?? 0n,
      Number(price),
      selectedToken.decimals,
    )
    : null;

  const { balance } = useTokenBalance(sender, token);
  const { balance: evmosBalance } = useTokenBalance(
    evmosData?.bech32Address,
    token,
  );
  const balances =
    sender === evmosData?.bech32Address
      ? [evmosBalance].filter((b) => b !== undefined)
      : [balance, evmosBalance].filter((b) => b !== undefined);
  const chain = sender ? getChainByAddress(sender) : chains["evmos"];

  const insufficientBalance =
    selectedBalance?.value ?? 0n < amount ? true : false;

  useEffect(() => {
    if (
      balances.length > 0 &&
      selectedBalance === undefined
    ) {
      setSelectedBalance(balances[0]);
    }
  }, [balances]);

  return (
    <section className="space-y-3">
      <Title variant="modal-black" icon={<PayIcon className="text-pink-300" />}>
        {t("pay.title")}
      </Title>

      <Subtitle variant="modal-black">{t("pay.subtitle")}</Subtitle>

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
                <span className="text-gray-400">from:</span>
                <span className="text-red font-semibold">
                  {truncateAddress(requester)}
                </span>
              </div>
            </div>
            <AmountBox
              amount={amount}
              token={selectedToken}
              amountInUsd={amountInUsd}
            />

            {isDisconnected && (
              <WalletConnection
                copilotModal={({
                  beforeStartHook,
                }: {
                  beforeStartHook: Dispatch<SetStateAction<boolean>>;
                }) => <CopilotButton beforeStartHook={beforeStartHook} />}
                dispatch={dispatch}
                walletExtension={wallet}
                variant="primary-lg"
              />
            )}

            {!isDisconnected && (
              <>
                <CryptoSelectorDropdownBox>
                  <CryptoSelector
                    value={selectedBalance?.type ?? ""}
                    onChange={(type) => {
                      setSelectedBalance(
                        balances?.find((b) => b?.type === type),
                      );
                      sendEvent(SELECT_NETWORK_PAY_FLOW, {
                        // TODO: we should pass here the network.
                      });
                    }}
                  >
                    <CryptoSelector.Button>
                      <div className="pl-2 items-center flex gap-1.5">
                        <Image
                          src={`/assets/chains/${selectedBalance ? selectedBalance?.type === "ERC20"
                            ? "evmos"
                            : selectedBalance?.denom
                            : "evmos"}.png`}
                          className="rounded-full"
                          alt=""
                          width={24}
                          height={24}
                        />
                        {selectedBalance ? selectedBalance?.type === "ERC20"
                          ? "Evmos"
                          : chain.name : "evmos"}
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
                            src={`/assets/tokens/${b?.type === "ERC20"
                              ? "evmos"
                              : selectedBalance?.denom
                              }.png`}
                            key={b?.address}
                            value={b?.type ?? ""}
                          >
                            {b?.type === "ERC20" ? "Evmos" : chain.name} -{" "}
                            {formatUnits(b?.value ?? 0n, b?.decimals ?? 0)}{" "}
                            {selectedToken?.denom?.toLocaleUpperCase()}
                          </CryptoSelector.Option>
                        );
                      })}
                    </CryptoSelector.Options>
                  </CryptoSelector>
                </CryptoSelectorDropdownBox>
                {selectedBalance && (
                  <div className={`flex flex-col gap-2`}>
                    <span className="font-medium">Your Balance</span>
                    <div className="rounded p-2 border border-pink-300">
                      <div
                        className={`flex justify-between  ${insufficientBalance ? "opacity-60" : ""
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            {formatUnits(
                              selectedBalance?.value ?? 0n,
                              selectedBalance?.decimals ?? 0,
                            )}{" "}
                            {selectedToken?.denom}
                          </span>
                          <span className="text-gray-300 text-xs">
                            ≈ {selectedTokenUSD}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {selectedBalance?.type === "ERC20"
                            ? "Evmos"
                            : chain.name}
                        </span>
                      </div>
                    </div>
                    {insufficientBalance && (
                      <span className="text-xs text-red-900 font-bold">
                        Insuficient Balance
                      </span>
                    )}
                  </div>
                )}

                {!insufficientBalance && (
                  <PrimaryButton
                    disabled={insufficientBalance}
                    variant={false ? "outline-primary" : undefined}
                    onClick={() => {
                      sendEvent(CLICK_ON_PAY);
                    }}
                    className="w-full text-lg rounded-md capitalize mt-5"
                  >
                    {t("pay.button")}
                  </PrimaryButton>
                )}

                {insufficientBalance && (
                  <PrimaryButton
                    disabled={false}
                    variant={"outline-primary"}
                    onClick={() => {
                      sendEvent(CLICK_ON_SWAP_ASSETS_PAY_FLOW);
                    }}
                    className="w-full text-lg rounded-md capitalize mt-5"
                  >
                    {t("pay.swap.button")}
                  </PrimaryButton>
                )}
              </>
            )}
          </div>
        </section>
      </form>
    </section>
  );
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import React from "react";
import {
    PrimaryButton,
    Title,
} from "ui-helpers";
import { useTranslation } from "next-i18next";
import { EVMOS_PAGE_URL } from "constants-helper";

import {
    getTokenByMinDenom,
} from "evmos-wallet";
import { CopyPasteIcon, BackArrowIcon, RequestIcon } from "icons";
import { useWalletAccountByPrefix } from "../hooks/useAccountByPrefix";
import { tokenToUSD } from "../common/utils";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { useSearchParams } from 'next/navigation'
import { AmountBox } from "../common/AmountBox";
import { TokenMinDenom } from "evmos-wallet/src/registry-actions/types";
import { RequestModalProps } from "./RequestModal";

export const ShareContent = ({ message, token, setState }: {
    message: string; token: {
        denom: TokenMinDenom,
        amount: bigint
    };
    setState: RequestModalProps['setState']
}) => {
    const { t } = useTranslation();

    const searchParams = useSearchParams()

    const { data } = useWalletAccountByPrefix("evmos");

    const sender = data?.bech32Address;

    const shareEnabled = navigator.share !== undefined;

    const price = useTokenPrice(token.denom);
    const selectedToken = getTokenByMinDenom(token.denom);
    const amountInUsd = price
        ? tokenToUSD(token.amount, Number(price), selectedToken.decimals)
        : null;

    const shareURL = `${EVMOS_PAGE_URL}assets?action=pay&chainPrefix=${searchParams.get("chainPrefix")}&denom=${token.denom}&amount=${token.amount}&message=${message}&requester=${sender}`

    return (
        <section className="space-y-3">
            <Title
                variant="modal-black"
                icon={<RequestIcon className="text-pink-300" />}
            >
                {t("request.title")}
            </Title>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <section>
                    <div className="flex flex-col gap-5">
                        <button onClick={() => {
                            setState((prev) => ({
                                ...prev,
                                step: "setup",
                            }))
                        }} className="text-pink-300">
                            <BackArrowIcon width={28} />
                        </button>
                        <div className="flex gap-2 flex-col">
                            <div className="bg-white w-44 h-44 rounded-xl self-center" />
                            <span className="text-red text-xs self-center">Share Payment QR</span>
                        </div>

                        <div className="w-full rounded-md bg-gray-500 py-2 px-3 text-xs font-medium flex justify-between items-center space-x-5">
                            <span className="text-sm overflow-hidden">{
                                shareURL.substring(0, 40)}...</span>
                            <button onClick={() => {
                                navigator.clipboard.writeText(shareURL);
                            }} className="">
                                <CopyPasteIcon
                                    height={32}
                                    width={32}
                                />
                            </button>


                        </div>


                        <div className="flex gap-1 flex-col">
                            <span className="text-gray-300 text-xs">
                                Requesting:
                            </span>
                            <AmountBox
                                amount={token.amount}
                                token={selectedToken}
                                amountInUsd={amountInUsd}
                            />
                        </div>

                        <PrimaryButton
                            // TODO: change variant to outline-primary if the user doesn't have enough balance to pay the fee
                            // variant="outline-primary"
                            onClick={() => {
                                if (shareEnabled) {
                                    navigator.share({ url: shareURL, title: "Payment Link" })
                                } else {
                                    navigator.clipboard.writeText(`Hi could you please transfer "${message}" using this payment link:\n\n${shareURL}}`);
                                }
                            }}
                            className="w-full text-lg rounded-md capitalize mt-5"
                        // TODO: we should change the message and the action depending if the user has enought balance to pay the fee or if we have to redirect them to axelar page
                        // "transfer.swap.button.text" - "transfer.bridge.button.text"
                        >
                            {shareEnabled ? t("request.share.button") : t("request.copy.button")}
                        </PrimaryButton>
                    </div>

                </section>
            </form>
        </section>
    );
};

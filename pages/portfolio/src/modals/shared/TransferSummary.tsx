import Image from "next/image";
import React from "react";
import { formatUnits } from "@evmosapps/evmos-wallet/src/registry-actions/utils";
import { cn } from "helpers";
import { TokenAmount } from "@evmosapps/evmos-wallet/src/registry-actions/types";
import { getChain, getToken, useFee } from "@evmosapps/evmos-wallet";
import { AddressDisplay, Arrow } from "@evmosapps/ui-helpers";

import { useTranslation } from "@evmosapps/i18n/client";
import { getChainByAddress } from "@evmosapps/evmos-wallet/src/registry-actions/get-chain-by-account";
import { getTokenByRef } from "@evmosapps/evmos-wallet/src/registry-actions/get-token-by-ref";
import { Address } from "helpers/src/crypto/addresses/types";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { getPrefix } from "helpers/src/crypto/addresses/get-prefix";
export const TransferSummary = ({
  sender,
  receiver,
  token,
  disabled = false,
}: {
  sender: Address;
  receiver: Address;
  token: TokenAmount & {
    networkPrefix: string;
  };
  disabled?: boolean;
}) => {
  const senderPrefix = getPrefix(normalizeToCosmos(sender));
  const receiverPrefix = getPrefix(normalizeToCosmos(receiver));
  const senderChain = getChain(senderPrefix);
  const receiverChain = getChain(receiverPrefix);

  const { name, decimals, denom } = getTokenByRef(token.ref);

  const { fee, isFetching } = useFee({
    sender,
    receiverChainPrefix: receiver
      ? getPrefix(normalizeToCosmos(receiver))
      : "evmos",
    tokenRef: token.ref,
  });

  const { t } = useTranslation("portfolio");
  const feeChain = getChainByAddress(sender);
  const feeToken = getToken(feeChain.prefix, feeChain.feeToken);
  return (
    <div className={cn("flex items-stretch", disabled && "disabled")}>
      {senderChain && (
        <div className="flex flex-col space-y-2 items-center">
          <Image
            className="h-10 w-10 md:h-12 md:w-12 bg-white rounded-full"
            src={`/chains/${senderChain.prefix}.png`}
            width={48}
            height={48}
            alt={senderChain.name}
          />
          <p className="text-xxxs md:text-xxs text-gray-200 tracking-wide">
            <AddressDisplay address={sender} fallback="Account 1" />
          </p>
        </div>
      )}
      <div className="px-4 h-full justify-center flex flex-col items-center flex-grow tracking-wider">
        <h3 className="text-xxs md:text-xs flex justify-center items-center gap-x-2 text-white">
          <Image
            className="h-4 w-4 md:h-6 md:w-6 rounded-full"
            src={`/tokens/${denom.toLowerCase()}.png`}
            width={18}
            height={18}
            alt={name}
          />
          {formatUnits(token.amount, decimals)} {denom}
        </h3>

        <Arrow />
        {isFetching && (
          <p className="text-white text-xxxs md:text-xxs">
            {t("message.processing.fee")}
          </p>
        )}
        {!isFetching && fee && feeToken && (
          <p className="text-white text-xxxs md:text-xxs">
            Fee:{" "}
            <span className="text-pink-300">
              {formatUnits(fee.token.amount, feeToken.decimals)}{" "}
              {feeToken.denom}
            </span>
          </p>
        )}
      </div>
      {receiverChain && (
        <div className="flex flex-col space-y-2 items-center">
          <Image
            className="h-10 w-10 md:h-12 md:w-12 bg-white rounded-full"
            src={`/chains/${receiverChain.prefix}.png`}
            width={48}
            height={48}
            alt={receiverChain.name}
          />
          <p className="text-xxxs md:text-xxs text-gray-200">
            <AddressDisplay address={receiver} fallback="Account 2" />
          </p>
        </div>
      )}
    </div>
  );
};

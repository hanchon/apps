import { useTranslation } from "next-i18next";

import {
  PrimaryButton,
  ContainerConfirmation,
  ViewExplorer,
  ConfirmationTitle,
  ConfirmationMessage,
  Divider,
  ContainerItem,
  ConfirmationText,
} from "ui-helpers";
import { useModalState } from "./hooks/useModal";
import { z } from "zod";
import { FetchTransactionResult, fetchTransaction } from "wagmi/actions";
import { Hex, decodeFunctionData, formatUnits } from "viem";
import {
  Address,
  ICS20_ADDRESS,
  MsgTransfer,
  apiCosmosBlockByHeight,
  apiCosmosTxByHash,
  getAbi,
  getTokenByMinDenom,
  normalizeToCosmosAddress,
} from "evmos-wallet";
import { SuccessTxIcon } from "icons";
import { Prefix } from "evmos-wallet/src/registry-actions/types";
import {
  ChainPrefixSchema,
  HexSchema,
  normalizeToMinDenom,
} from "evmos-wallet/src/registry-actions/utils";
import { useQuery } from "@tanstack/react-query";
import { chains } from "@evmos-apps/registry";
import { AddressDisplay } from "./parts/AddressDisplay";
import { SkeletonLoading } from "./parts/SkeletonLoading";
const generateReceipt = ({
  sender,
  receiver,
  amount,
  denom,
  height,
}: {
  sender: string;
  receiver: string;
  amount: bigint | number | string;
  denom: string;
  height: string | number | bigint;
}) => ({
  sender: normalizeToCosmosAddress(sender as Address<Prefix>),
  receiver: normalizeToCosmosAddress(receiver as Address<Prefix>),
  token: {
    denom: normalizeToMinDenom(denom) ?? denom,
    amount: BigInt(amount),
  },
  height: BigInt(height),
});

const generateICS20TransferReceipt = async (result: FetchTransactionResult) => {
  const { args, functionName } = decodeFunctionData({
    abi: getAbi("ics20"),
    data: result.input,
  });
  if (!args || functionName !== "transfer") throw new Error("Missing args");

  const [, , denom, amount, sender, receiver] = args;
  if (!denom || !amount || !sender || !receiver)
    throw new Error("Missing args");
  return generateReceipt({
    sender,
    receiver,
    amount,
    denom,
    height: result.blockNumber,
  });
};

const generateERC20TransferReceipt = async (result: FetchTransactionResult) => {
  const { args, functionName } = decodeFunctionData({
    abi: getAbi("erc20"),
    data: result.input,
  });
  if (!args || functionName !== "transfer") throw new Error("Missing args");

  const [receiver, amount] = args;

  if (!amount || !amount || !receiver) throw new Error("Missing args");
  return generateReceipt({
    sender: result.from,
    receiver,
    amount,
    denom: "aevmos",
    height: result.blockNumber,
  });
};

const isIBCMsgTransfer = (message: unknown): message is MsgTransfer => {
  return (
    typeof message === "object" &&
    message !== null &&
    "@type" in message &&
    message["@type"] === "/ibc.applications.transfer.v1.MsgTransfer"
  );
};

const useReceipt = (hash?: Hex, chainPrefix?: Prefix) => {
  const { data, ...rest } = useQuery({
    queryKey: ["receipt", hash],
    enabled: !!hash && !!chainPrefix,
    queryFn: async () => {
      if (!hash || !chainPrefix) throw new Error("Missing parameters");
      /**
       * All transactions originated on Evmos are sent through Precompiles, so we fetch the results as
       * ethereum transactions
       */
      if (chainPrefix === "evmos") {
        const result = await fetchTransaction({
          hash: hash,
        });
        if (result.to === ICS20_ADDRESS) {
          return generateICS20TransferReceipt(result);
        }
        return generateERC20TransferReceipt(result);
      }

      /**
       * All transactions originated on Cosmos are sent through the Cosmos SDK, so we fetch the results as
       * cosmos transactions
       */
      const chainConfig = chains[chainPrefix];

      const result = await apiCosmosTxByHash(chainConfig.cosmosRest.http, hash);
      const message = { ...result.tx.body.messages[0] } as const;
      if (!isIBCMsgTransfer(message)) {
        throw new Error("Unsupported transaction type");
      }
      return generateReceipt({
        sender: message.sender,
        receiver: message.receiver,
        amount: message.token.amount,
        denom: message.token.denom,
        height: result.tx_response.height,
      });
    },
  });
  return {
    receipt: data,
    ...rest,
  };
};

const useBlock = (prefix?: Prefix, height?: bigint) => {
  return useQuery({
    queryKey: ["block", prefix, height?.toString()],

    queryFn: async () => {
      if (!height || !prefix) throw new Error("Missing parameters");
      const chainConfig = chains[prefix];
      const result = await apiCosmosBlockByHeight(
        chainConfig.cosmosRest.http,
        height
      );
      return result;
    },
    enabled: !!height && !!prefix,
  });
};

export const Confirmation = () => {
  const {
    setShow,
    state: { hash, chainPrefix },
  } = useModalState(
    "receipt",
    z.object({
      hash: HexSchema.optional(),
      chainPrefix: ChainPrefixSchema.optional(),
    }),
    {}
  );
  let { receipt, isLoading: isReceiptLoading } = useReceipt(hash, chainPrefix);
  // isReceiptLoading = true;
  // receipt = undefined;
  const { t } = useTranslation();
  const token = receipt?.token.denom
    ? getTokenByMinDenom(receipt.token.denom)
    : undefined;

  const { data: block, isLoading: isFetchingBlock } = useBlock(
    chainPrefix,
    receipt?.height
  );
  const chain = chains[chainPrefix ?? "evmos"];
  const blockDate = block?.block?.header?.time
    ? new Date(block.block.header.time)
    : undefined;

  /**
   * TODO: We only have a display name field for chains in our registry, not a name that can be used as a common identifier
   * We should add a name field that matches the cosmos registry name field
   */

  const networkName = chain.name.split(" ")[0].toLowerCase();
  return (
    <>
      <ContainerConfirmation>
        {/* PaymentTxIcon FailTxIcon */}
        {receipt && <SuccessTxIcon />}
        {isReceiptLoading && (
          <div className="animate-pulse bg-white/10 rounded-full h-56 w-56" />
        )}

        <ConfirmationTitle>
          <SkeletonLoading loading={isReceiptLoading}>
            {receipt && t("transfer.confirmation.message.successful")}
          </SkeletonLoading>
        </ConfirmationTitle>

        <ConfirmationMessage>
          <SkeletonLoading loading={isReceiptLoading}>
            {receipt && (
              <>
                {t("transfer.confirmation.message.successful.description")}
                <br />
                {t("transfer.confirmation.message.successful.description2")}
              </>
            )}
          </SkeletonLoading>
        </ConfirmationMessage>
        <Divider variant="info" className="w-full">
          <ViewExplorer
            txHash={networkName !== "evmos" ? hash?.slice(2) ?? "" : hash ?? ""}
            explorerTxUrl={`https://www.mintscan.io/${networkName}/transactions/`}
            text={`Transaction ID: ${hash?.slice(0, 10)}...`}
          />
        </Divider>

        <ContainerItem>
          <ConfirmationText>
            {t("transfer.confirmation.total.amount.sent")}
          </ConfirmationText>

          <p>
            <SkeletonLoading loading={isReceiptLoading}>
              {receipt &&
                `${formatUnits(receipt.token.amount, token?.decimals ?? 0)} ${
                  token?.denom ?? receipt?.token.denom
                }`}
            </SkeletonLoading>
          </p>
        </ContainerItem>
        <ContainerItem>
          <ConfirmationText>
            {t("transfer.confirmation.recipient.address")}
          </ConfirmationText>

          <p>
            <SkeletonLoading className="w-24" loading={isReceiptLoading}>
              {receipt && <AddressDisplay address={receipt.receiver} />}
            </SkeletonLoading>
          </p>
        </ContainerItem>
        <ContainerItem>
          <ConfirmationText>{t("transfer.confirmation.date")}</ConfirmationText>

          <p>
            <SkeletonLoading loading={isReceiptLoading || isFetchingBlock}>
              {blockDate && blockDate.toDateString()}
            </SkeletonLoading>
          </p>
        </ContainerItem>
      </ContainerConfirmation>
      <PrimaryButton
        onClick={() => {
          setShow(false);
        }}
        className="w-full text-lg rounded-md capitalize mt-11"
      >
        {t("transfer.confirmation.button.text")}
      </PrimaryButton>
    </>
  );
};

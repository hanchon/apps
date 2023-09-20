import { useMemo } from "react";
import { Prefix, TokenAmount } from "evmos-wallet/src/registry-actions/types";
import {
  Address, isValidCosmosAddress,
  isValidHexAddress,
  normalizeToCosmosAddress,
  useAccountExists,
  useFee,
  useTokenBalance,
  useTransfer
} from "evmos-wallet";
import { Receiverish, normalizeToPrefix } from "evmos-wallet/src/registry-actions/utils/normalize-to-prefix";
import { getFeeToken } from "evmos-wallet/src/registry-actions/getFeeToken";

export const useSend = (
  {
    sender, receiver, token,
  }: {
    sender?: Address<Prefix>;
    receiver?: Receiverish;
    token?: TokenAmount;
  }
) => {
  const receiverPrefix = receiver ? normalizeToPrefix(receiver) : "evmos";
  const receiverAddress = isValidHexAddress(receiver) || isValidCosmosAddress(receiver) ? receiver : undefined;
  const { data: accountExists } = useAccountExists(sender);
  const feeToken = sender ? getFeeToken(sender) : undefined;

  /**
   * Calculate Fee
   */
  const feeQuery = useFee({
    sender,
    receiverChainPrefix: receiverPrefix,
    tokenRef: token?.ref,
  });
  const { fee, isLoading: isFeeLoading } = feeQuery;
  /**
   * Transfer
   */
  const transferQuery = useTransfer({
    sender,
    receiver: receiverAddress,
    token: token,
    fee,
  });
  const { transfer, isLoading: isTransferring, data: transferResponse } = transferQuery;
  /**
   * Balances
   */
  const balanceQuery = useTokenBalance(sender, token?.ref);
  const { balance, isFetching: isFetchingBalance } = balanceQuery;
  const feeBalanceQuery = useTokenBalance(sender, feeToken?.ref);
  const { balance: feeBalance, isFetching: isFetchingFeeBalance } = feeBalanceQuery;


  /**
   * Checks
   */
  /**
   * Full amount includes fee when necessary
   */
  const fullAmount = useMemo(() => {
    if (token && token.ref === fee?.token.ref) {
      return token.amount + fee.token.amount;
    }
    return token?.amount ?? 0n;
  }, [token?.ref, token?.amount, fee?.token.ref, fee?.token.amount]);

  const hasSufficientBalance = accountExists === true && fullAmount <= (balance?.value ?? 0n);

  const hasSufficientBalanceForFee = (fee?.token.amount ?? 0) <= (feeBalance?.value ?? 0n);

  const hasValidReceiver = receiverAddress && sender && normalizeToCosmosAddress(sender) !== normalizeToCosmosAddress(receiverAddress);

  const hasValidAmount = token?.amount !== undefined && token?.amount > 0n;

  const hasLoadedFee = fee !== undefined && isFeeLoading === false;

  const out = {
    transfer,
    isReady: hasSufficientBalance && hasSufficientBalanceForFee && hasValidReceiver && hasValidAmount && hasLoadedFee,
    isPreparing: isFeeLoading || isFetchingBalance || isFetchingFeeBalance,
    isFetchingBalance,
    isFetchingFeeBalance,
    isTransferring,
    transferResponse,
    balance,
    fee,
    feeBalance,
    feeToken,

    validation: {
      hasSufficientBalance,
      hasSufficientBalanceForFee,
      hasValidReceiver,
      hasValidAmount,
      hasLoadedFee,
    }
  };

  return {
    ...out,
    __DEBUG__: {
      ...out,

      sender,
      receiver,
      token,
      feeQuery,
      transferQuery,
      balanceQuery,
      feeBalanceQuery,
    }
  };
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { parseUnits } from "ethers/lib/utils.js";
import { useDispatch, useSelector } from "react-redux";
import { JsonRpcProvider } from "@ethersproject/providers";

import { WEVMOS_CONTRACT_ADDRESS } from "../../constants";
import { createContract } from "../contracts/contractHelper";
import { WEVMOS } from "../contracts/abis/WEVMOS/WEVMOS";
import WETH_ABI from "../contracts/abis/WEVMOS/WEVMOS.json";
import { ConvertProps } from "../types";
import { BigNumber } from "ethers";
import {
  snackBroadcastSuccessful,
  snackErrorGeneratingTx,
  snackRequestRejected,
  StoreType,
} from "evmos-wallet";
import {
  useTracker,
  CLICK_BUTTON_CONFIRM_WRAP_TX,
  SUCCESSFUL_WRAP_TX,
  UNSUCCESSFUL_WRAP_TX,
} from "tracker";
import { GENERATING_TX_NOTIFICATIONS } from "../../../../../internal/asset/functionality/transactions/errors";
import { convertToKeplrTx, signKeplrTx } from "./keplr_utils";

const wrapEvmos = "EVMOS <> WEVMOS";
const unwrapEvmos = "WEVMOS <> EVMOS";
export const useConvert = (useConvertProps: ConvertProps) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();
  const WEVMOS = WEVMOS_CONTRACT_ADDRESS;

  const { handlePreClickAction: clickConfirmWrapTx } = useTracker(
    CLICK_BUTTON_CONFIRM_WRAP_TX
  );

  const { handlePreClickAction: successfulTx } = useTracker(SUCCESSFUL_WRAP_TX);

  const { handlePreClickAction: unsuccessfulTx } =
    useTracker(UNSUCCESSFUL_WRAP_TX);

  const handleConfirmButton = async () => {
    clickConfirmWrapTx({
      convert: useConvertProps.balance.isIBCBalance ? wrapEvmos : unwrapEvmos,
      wallet: wallet?.evmosAddressEthFormat,
      provider: wallet?.extensionName,
    });

    useConvertProps.setConfirmClicked(true);
    if (wallet.evmosPubkey === null) {
      dispatch(snackRequestRejected());
      useConvertProps.setShow(false);
      return;
    }
    if (
      useConvertProps.inputValue === undefined ||
      useConvertProps.inputValue === null ||
      useConvertProps.inputValue === "" ||
      Number(useConvertProps.inputValue) === 0
    ) {
      return;
    }
    const amount = parseUnits(
      useConvertProps.inputValue,
      BigNumber.from(useConvertProps.item.decimals)
    );
    if (amount.gt(useConvertProps.balance.balanceFrom)) {
      return;
    }
    if (useConvertProps.balance.isIBCBalance) {
      try {
        const contract = await createContract(WEVMOS, WETH_ABI, "metamask");
        if (contract === null) {
          dispatch(snackErrorGeneratingTx());
          useConvertProps.setShow(false);
          unsuccessfulTx({
            errorMessage: "contract is null",
            wallet: wallet?.evmosAddressEthFormat,
            provider: wallet?.extensionName,
            transaction: "unsuccessful",
            convert: wrapEvmos,
          });
          return;
        }
        useConvertProps.setDisabled(true);

        const txraw = await (contract as WEVMOS).populateTransaction.deposit({
          value: amount,
        });
        //conver to keplr transaction type

        let customHttpProvider = new JsonRpcProvider(
          "https://eth.bd.evmos.org:8545/"
        );

        let converted = await convertToKeplrTx(
          customHttpProvider,
          wallet.evmosAddressEthFormat,
          txraw
        );

        const res = await signKeplrTx({ ...converted });

        // console.log("trying to sendd ", mms);
        await customHttpProvider.sendTransaction(res);

        dispatch(
          snackBroadcastSuccessful("todo", "www.mintscan.io/evmos/txs/")
        );
        successfulTx({
          txHash: "todo",
          wallet: wallet?.evmosAddressEthFormat,
          provider: wallet?.extensionName,
          transaction: "successful",
          convert: wrapEvmos,
        });
      } catch (e) {
        console.log("error", e);
        // TODO: Add Sentry here!
        dispatch(snackErrorGeneratingTx());
        unsuccessfulTx({
          errorMessage: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
          wallet: wallet?.evmosAddressEthFormat,
          provider: wallet?.extensionName,
          transaction: "unsuccessful",
          convert: wrapEvmos,
        });
      }
    } else {
      try {
        const contract = await createContract(WEVMOS, WETH_ABI, "metamask");
        if (contract === null) {
          dispatch(snackErrorGeneratingTx());
          useConvertProps.setShow(false);
          unsuccessfulTx({
            errorMessage: "contract is null",
            wallet: wallet?.evmosAddressEthFormat,
            provider: wallet?.extensionName,
            transaction: "unsuccessful",
            convert: unwrapEvmos,
          });
          return;
        }
        useConvertProps.setDisabled(true);

        const txraw = await (contract as WEVMOS).populateTransaction.withdraw(
          amount
        );

        //conver to keplr transaction type

        let customHttpProvider = new JsonRpcProvider(
          "https://eth.bd.evmos.org:8545/"
        );

        let converted = await convertToKeplrTx(
          customHttpProvider,
          wallet.evmosAddressEthFormat,
          txraw
        );

        const res = await signKeplrTx({ ...converted });

        await customHttpProvider.sendTransaction(res);

        dispatch(
          snackBroadcastSuccessful(res.hash, "www.mintscan.io/evmos/txs/")
        );
        successfulTx({
          txHash: res.hash,
          wallet: wallet?.evmosAddressEthFormat,
          provider: wallet?.extensionName,
          transaction: "successful",
          convert: unwrapEvmos,
        });
      } catch (e) {
        console.log("error", e);
        // TODO: Add Sentry here!
        dispatch(snackErrorGeneratingTx());
        unsuccessfulTx({
          errorMessage: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
          wallet: wallet?.evmosAddressEthFormat,
          provider: wallet?.extensionName,
          transaction: "unsuccessful",
          convert: unwrapEvmos,
        });
      }
    }
    useConvertProps.setShow(false);
  };

  return { handleConfirmButton };
};

import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useVestingPrecompile } from "../../../internal/useVestingPrecompile";
import { useDispatch } from "react-redux";
import {
  addSnackbar,
  SNACKBAR_CONTENT_TYPES,
  SNACKBAR_TYPES,
  BROADCASTED_NOTIFICATIONS,
  GENERATING_TX_NOTIFICATIONS,
} from "evmos-wallet";
import { EXPLORER_URL } from "constants-helper";

export default function ApproveFunding({
  onNext,
}: {
  onNext: () => void;
}) {
  const { t } = useTranslation();
  const { approveFunding } = useVestingPrecompile();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleApprove() {
    setIsLoading(true);
    try {
      const res = await approveFunding();
      dispatch(
        addSnackbar({
          id: 0,
          content: {
            type: SNACKBAR_CONTENT_TYPES.LINK,
            title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
            hash: res.hash,
            explorerTxUrl: `${EXPLORER_URL}/tx/`,
          },
          type: SNACKBAR_TYPES.SUCCESS,
        }),
      );
      setIsLoading(false);
      onNext();
    } catch {
      setIsLoading(false);
      dispatch(
        addSnackbar({
          id: 0,
          content: {
            type: SNACKBAR_CONTENT_TYPES.TEXT,
            title: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
          },
          type: SNACKBAR_TYPES.ERROR,
        }),
      );
    }
  }

  return (
    <div className="flex flex-col space-y-3">
      <span>{t("vesting.executioner.address.body")}</span>
      <label htmlFor="address" className="text-xs font-bold">
        {t("vesting.executioner.address.title")}
      </label>
      <button
        onClick={handleApprove}
        disabled={isLoading}
        style={{ backgroundColor: "#ed4e33" }}
        className={`w-full cursor-pointer rounded p-2 font-body text-lg text-pearl ${
          isLoading ? "opacity-40" : ""
        }`}
      >
        {isLoading ? "Loading..." : t("vesting.approve.button")}
      </button>
    </div>
  );
}

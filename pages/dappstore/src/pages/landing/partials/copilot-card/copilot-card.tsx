import { useTranslation } from "@evmosapps/i18n/client";
import { EvmosCopilotWhiteIcon } from "icons";
import { useCopilotCard } from "./use-copilot-card";

export const CopilotCard = () => {
  const { stepsToDraw, drawButton, sequence } = useCopilotCard();
  const { t } = useTranslation("dappStore");

  if (sequence) {
    return null;
  }
  return (
    <div className="bg-red flex flex-col justify-start space-y-3 rounded-lg bg-[url(/evmos_bg.png)] bg-contain bg-center bg-no-repeat p-8">
      <div className="flex  items-start justify-between">
        <h1 className="text-pearl text-2xl font-bold">
          {t("dappStore.onboard.title")}
        </h1>
        <EvmosCopilotWhiteIcon width={"50"} height={"50"} />
      </div>
      <ol className="mt-4 space-y-4 md:mt-0">{stepsToDraw}</ol>
      <div className="flex pt-4">{drawButton}</div>
    </div>
  );
};

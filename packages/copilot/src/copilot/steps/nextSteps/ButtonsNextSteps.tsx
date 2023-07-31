import { useContext } from "react";
import { StepsContext } from "../../container/StepsContext";
import { Button } from "./button/Button";
import { Badge } from "ui-helpers";
import { TitleButton } from "./button/TitleButton";
import { t } from "../../../locales/translate";
import {
  handleInteractWithdApp,
  handleLearnMore,
  handleStakeWithEvmos,
} from "./helpers";
import {
  CLICK_ON_INTERACT_WITH_DAPP_COPILOT,
  CLICK_ON_LEARN_MORE_COPILOT,
  CLICK_ON_STAKE_YOUR_EVMOS_COPILOT,
  useTracker,
} from "tracker";
export const ButtonsNextSteps = () => {
  const { setShowModal, resetSteps } = useContext(StepsContext);

  const { handlePreClickAction: trackInteractWithdAppClick } = useTracker(
    CLICK_ON_INTERACT_WITH_DAPP_COPILOT
  );
  const { handlePreClickAction: trackStakeEvmosClick } = useTracker(
    CLICK_ON_STAKE_YOUR_EVMOS_COPILOT
  );
  const { handlePreClickAction: trackLearnMoreClick } = useTracker(
    CLICK_ON_LEARN_MORE_COPILOT
  );
  // TODO: use ecosystem, staking and academy link from locales
  return (
    <>
      <div className="grid w-full grid-cols-1 space-y-3 pt-5 pb-3 md:grid-cols-2 md:space-y-0 md:space-x-4">
        <Button
          handleClick={() => {
            handleInteractWithdApp("https://evmos.org/ecosystem", setShowModal);
            trackInteractWithdAppClick();
            resetSteps();
          }}
        >
          <TitleButton text={t("nextsteps.interactWithdApp.title") as string} />
          <Badge text={t("nextsteps.interactWithdApp.badge") as string} />
        </Button>

        <Button
          handleClick={() => {
            handleStakeWithEvmos("https://app.evmos.org/staking", setShowModal);
            trackStakeEvmosClick();
            resetSteps();
          }}
        >
          <TitleButton text={t("nextsteps.stakeEvmos.title") as string} />

          <Badge
            text={t("nextsteps.stakeEvmos.badge") as string}
            style="ring-lightYellow bg-lightYellow1 text-brown"
          />
        </Button>
      </div>
      <button
        className="w-full cursor-pointer rounded-lg border border-gray300 py-3 shadow transition-all duration-300 hover:shadow-md"
        onClick={() => {
          handleLearnMore("https://academy.evmos.org/faq", setShowModal);
          trackLearnMoreClick();
          resetSteps();
        }}
      >
        <TitleButton text={t("nextsteps.learnMore.title") as string} />
      </button>
    </>
  );
};
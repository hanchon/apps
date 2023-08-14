import { CLICK_ON_GIVE_FEEDBACK_MAIN_PAGE, useTracker } from "tracker";
import { Feedback } from "ui-helpers";
export const GiveFeedback = () => {
  const { handlePreClickAction } = useTracker(CLICK_ON_GIVE_FEEDBACK_MAIN_PAGE);

  const handleClick = () => {
    handlePreClickAction();
  };

  return <Feedback text="Give us Feedback" handleClick={handleClick} />;
};

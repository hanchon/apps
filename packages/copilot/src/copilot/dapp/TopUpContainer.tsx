import { StepsContextProvider } from "../container/StepsContext";
import { wizardSteps } from "../container/data";
import { TopUpDapp } from "./Topup";

export const TopUpContainer = () => {
  return (
    <StepsContextProvider steps={wizardSteps}>
      <TopUpDapp />
    </StepsContextProvider>
  );
};

import { CopilotCard } from "copilot";
import { StepsContextProvider, steps } from "copilot";
export const Onboard = () => {
  return (
    <StepsContextProvider steps={steps}>
      <CopilotCard />
    </StepsContextProvider>
  );
};

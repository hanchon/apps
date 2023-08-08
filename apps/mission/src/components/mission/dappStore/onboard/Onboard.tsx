import { CopilotCard, StepsContextProvider, steps } from "copilot";

export const Onboard = () => {
  return (
    <StepsContextProvider steps={steps}>
      <CopilotCard />
    </StepsContextProvider>
  );
};

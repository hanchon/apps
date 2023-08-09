import { StepsContextProvider } from "../container/StepsContext";
import { wizardSteps } from "../container/data";
import { TopUpDapp } from "./Topup";

export const TopUpContainer = ({ status }: { status: string }) => {
  return (
    <StepsContextProvider steps={wizardSteps}>
      <TopUpDapp status={status} />
    </StepsContextProvider>
  );
};

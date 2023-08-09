import { StepsContextProvider } from "../container/StepsContext";
import { steps } from "../container/data";
import { SetUpDapp } from "./SetUp";

export const SetUpContainer = ({ status }: { status: string }) => {
  return (
    <StepsContextProvider steps={steps}>
      <SetUpDapp status={status} />
    </StepsContextProvider>
  );
};

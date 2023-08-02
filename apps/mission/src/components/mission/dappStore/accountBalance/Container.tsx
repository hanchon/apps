import { StepsContextProvider, topUpStep } from "copilot";
import { AccountBalance } from "./AccountBalance";
export const AccountBalanceContainer = () => {
  return (
    <StepsContextProvider steps={topUpStep}>
      <AccountBalance />
    </StepsContextProvider>
  );
};

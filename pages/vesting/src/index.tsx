import { Suspense } from "react";
import { VestingPageContent } from "./components/vesting/VestingPage";

export const VestingPage = () => {
  return (
    <Suspense>
      <VestingPageContent />
    </Suspense>
  );
};

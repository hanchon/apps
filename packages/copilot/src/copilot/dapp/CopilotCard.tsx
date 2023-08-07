import { EvmosCopilotWhiteIcon } from "icons";
import { useCopilotDapp } from "./useCopilotDapp";

export const CopilotCard = () => {
  const { stepsToDraw, componentToDraw } = useCopilotDapp();
  return (
    <div className="bg-red flex flex-col justify-start space-y-6 rounded-lg bg-cover p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-pearl  text-2xl font-bold">
          Onboard to Evmos in 5 minutes
        </h1>
        <EvmosCopilotWhiteIcon width={"50"} height={"50"} />
      </div>
      <ol className="mt-4 space-y-3 md:mt-0">{stepsToDraw}</ol>
      {componentToDraw?.buttonDapp}
    </div>
  );
};

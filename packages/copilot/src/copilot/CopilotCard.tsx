import { useCopilot } from "./useCopilot";

export const CopilotCard = () => {
  const { stepsToDraw } = useCopilot();
  return (
    <div className="">
      <ol className="mt-4 space-y-3 md:mt-0">{stepsToDraw}</ol>
    </div>
  );
};

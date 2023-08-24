import { ProgressItem } from "./ProgressItem";
import { updateCurrentStatus } from "./helpers";
import { GroupStateI, SetUpAccountI } from "./types";

export const Progress = ({
  steps,
  groupState,
  setGroupState,
}: {
  steps: SetUpAccountI[];
  groupState: GroupStateI[];
  setGroupState: React.Dispatch<React.SetStateAction<GroupStateI[]>>;
}) => {
  //
  return (
    <nav aria-label="Progress" className="pt-5">
      <ol role="list" className="overflow-hidden">
        {steps.map((step, stepIdx) => {
          return (
            <ProgressItem
              key={step.id}
              step={step}
              index={stepIdx}
              length={steps.length}
              statusButton={
                updateCurrentStatus(groupState, stepIdx).at(stepIdx)?.status ??
                ""
              }
              setGroupState={setGroupState}
            />
          );
        })}
      </ol>
    </nav>
  );
};

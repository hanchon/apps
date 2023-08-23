import { KeplrIcon } from "icons";
import { Progress } from "ui-helpers";
import { stepsSetAccountKeplr } from "./utils";
import { useState } from "react";

export const Deposit = () => {
  const [groupState, setGroupState] = useState(
    stepsSetAccountKeplr.map((step, index) => ({
      id: step.id,
      index,
      status: step.status,
    }))
  );
  return (
    <div className="">
      {/* TODO: create a ui-helper for this and pass the h1 and h2 for each of the cases (and the icon too) */}
      <div className="bg-lightBlue flex space-x-2 justify-start rounded-lg p-4">
        <KeplrIcon />
        <div className="relative -top-[3px] text-blue text-sm">
          <h1 className="font-bold">Keplr is required</h1>
          <h2>Depositing assets can only be done with the Keplr extension.</h2>
        </div>
      </div>
      <Progress
        steps={stepsSetAccountKeplr}
        groupState={groupState}
        setGroupState={setGroupState}
      />
    </div>
  );
};

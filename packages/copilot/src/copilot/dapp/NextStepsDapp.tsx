import { ECOSYSTEM_URL, STAKING_URL } from "constants-helper";
import { Button } from "./Button";

export const NextStepsActionsDapp = ({ status }: { status: string }) => {
  return (
    <div className="flex items-center space-x-4">
      <Button
        text="Stake"
        onClick={() => {
          window.open(STAKING_URL);
        }}
        status={status}
      />
      <Button
        onClick={() => {
          window.open(ECOSYSTEM_URL);
        }}
        text="Use a dApp"
        className="text-pearl bg-[#FAF1E442]"
        status={status}
      />
    </div>
  );
};

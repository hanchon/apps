import { Button } from "./Button";

export const NextStepsActionsDapp = () => {
  return (
    <div className="flex items-center space-x-4">
      <Button
        text="Stake"
        onClick={() => {
          window.open("https://app.evmos.org/staking");
        }}
      />
      <Button
        onClick={() => {
          window.open(
            "https://altiplanic.notion.site/a188bd13dd114a88a7763fd2a8cc601e?v=403420ad21db41ce81f09b7e3f77e4e2"
          );
        }}
        text="Use a dApp"
        className="text-pearl bg-[#FAF1E442]"
      />
    </div>
  );
};

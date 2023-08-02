import { useRouter } from "next/router";
import { Button } from "../Button";
import { BalanceContainer } from "../card/BalanceContainer";
import { Card } from "../card/Card";
import { Description } from "../card/Description";
import { Title } from "../card/Title";

export const StakingCard = () => {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/staking");
  };

  return (
    <Card>
      <>
        <div>
          <Title firstWord="Evmos" secondWord="Staking" />
          <Description text="Earn rewards for participating in the network's security" />
        </div>
        {/* TODO: update values for the containers */}
        <div className="grid grid-cols-2">
          <BalanceContainer
            title="Available Balance"
            amount="1"
            amountInDollars="1"
          />
          <BalanceContainer
            title="Staked Balance"
            amount="1"
            amountInDollars="1"
          />
        </div>
        <div className="flex items-center justify-between rounded-lg bg-[#FFFFFF0F] p-3">
          <BalanceContainer
            title="Claimeable Rewards"
            amount="7"
            amountInDollars="1"
          />
          {/* TODO: add claim reward action - now it's in staking */}
          {/* disable button if the user is not connected or
          has <0.005 as it is in staking */}
          <button className="w-auto space-x-2 rounded bg-red px-4 py-2 text-sm font-bold normal-case text-pearl shadow transition-all duration-300 hover:bg-red1 hover:shadow-md">
            Claim Rewards
          </button>
        </div>
        <Button
          text="Stake & manage delegation"
          handleOnClick={handleOnClick}
        />
      </>
    </Card>
  );
};

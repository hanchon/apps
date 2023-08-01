import useAssetsTopBar from "../../../../internal/functionality/hooks/useAssetsTopBar";
import { useHeaderInfo } from "../../../../internal/functionality/hooks/useHeaderInfo";
import { convertFromAtto } from "helpers";
import { Button } from "../Button";
import { Copilot, StepsContext } from "copilot";
import { useContext } from "react";

export const AccountBalance = () => {
  const { totalStaked, totalRewards, wallet } = useHeaderInfo();
  const { evmosPrice, totalEvmosAsset } = useAssetsTopBar();

  const totalEvmos = totalEvmosAsset.add(totalStaked);
  // staked + evmos + rewards
  let totalBalance = Number(convertFromAtto(totalEvmos)) + totalRewards;

  const totalBalanceInDollars = totalBalance * Number(evmosPrice);

  const drawTotalBalance = () => {
    if (totalBalance < 1) {
      return totalBalance.toFixed(2);
    }
    return totalBalance.toFixed(0);
  };

  const drawTotalBalanceInDollars = () => {
    if (isNaN(totalBalanceInDollars)) {
      return 0;
    }
    if (totalBalanceInDollars < 1) {
      return totalBalanceInDollars.toFixed(2);
    }
    return totalBalanceInDollars.toFixed(0);
  };

  const { setShowModal } = useContext(StepsContext);

  return (
    <>
      <Copilot />
      <section className="text-[IBM]">
        <p className="text-2xl text-pearl ">Total Balance</p>
        <div className="flex items-center justify-center space-x-3">
          <span className="text-6xl font-bold text-white">
            {wallet.active ? drawTotalBalance() : "-"}
          </span>
          <span className="text-6xl font-bold text-white opacity-50">
            EVMOS
          </span>
          {wallet.active && (
            <Button
              handleOnClick={() => {
                console.log("Top Up Account");
                setShowModal(true);
              }}
              text="Top Up Account"
            />
          )}
        </div>
        <p className="mt-4 text-xl text-white opacity-50">
          $ {wallet.active ? drawTotalBalanceInDollars() : "-"}
        </p>
      </section>
    </>
  );
};

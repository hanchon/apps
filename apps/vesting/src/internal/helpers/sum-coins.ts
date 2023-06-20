import { Coin } from "@evmos/transactions";
import { BigNumber } from "ethers";

export const sumCoins = (coins: Coin[][]): Coin[] => {
  const coinsMap = coins.reduce((acc, coins) => {
    coins.forEach((coin) => {
      if (acc[coin.denom]) {
        acc[coin.denom] = BigNumber.from(acc[coin.denom])
          .add(coin.amount)
          .toString();
      } else {
        acc[coin.denom] = coin.amount;
      }
    });
    return acc;
  }, {} as Record<string, string>);

  return Object.entries(coinsMap).map(([denom, amount]) => ({ denom, amount }));
};

import { Period } from "@evmos/transactions";
import dayjs from "dayjs";
import { BigNumber } from "ethers";
import { distributeCoinsEvenly } from "./distribute-coins-evenly";
import { Intervals } from "./types";

export const generatePeriods = (
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
  interval: Intervals,
  fullAmount: BigNumber,
  denom: string
): Period[] => {
  let periods: number[] = [];

  for (
    let date = endDate;
    date.isAfter(startDate);
    date = date.subtract(1, interval)
  ) {
    periods = [date.diff(startDate, "seconds"), ...periods];
  }
  periods = periods.map((finalDate, i) =>
    i === 0 ? finalDate : finalDate - periods[i - 1]
  );
  const divisions = distributeCoinsEvenly(
    BigNumber.from(fullAmount),
    periods.length
  );
  return periods.map((period, i) => ({
    amount: [
      {
        amount: divisions[i].toString(),
        denom,
      },
    ],
    length: period,
  }));
};

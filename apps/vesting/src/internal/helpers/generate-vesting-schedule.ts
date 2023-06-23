import { MessageMsgCreateClawbackVestingAccount } from "@evmos/transactions";
import dayjs from "dayjs";
import { BigNumber } from "ethers";
import { convertFromAtto, convertToAtto } from "helpers";
import { applyCliff } from "./apply-cliff";
import { TIME_WINDOWS_TO_DAYJS_PARAMS_MAP } from "./constants";
import { generatePeriods } from "./generate-periods";
import { Intervals, TimeWindow, VestingSchedule } from "./types";

export const generateVestingSchedule = (
  startDate: dayjs.Dayjs,
  fullAmount: string | BigNumber,
  coinDenom: string,
  {
    fullVestingPeriod,
    vestingInterval,
    vestingCliff,
    lockingPeriod,
  }: VestingSchedule
): Pick<
  MessageMsgCreateClawbackVestingAccount,
  "startTime" | "vestingPeriods" | "lockupPeriods"
> => {
  const start = dayjs(startDate);
  console.log("fullVestingPer", fullVestingPeriod);
  const fullAmountAtto = convertToAtto(fullAmount);
  console.log("fullAmountAtto", fullAmountAtto);
  const endDate = start.add(
    //@ts-ignore
    ...TIME_WINDOWS_TO_DAYJS_PARAMS_MAP[fullVestingPeriod]
  );
  let vestingPeriods = generatePeriods(
    start,
    endDate,
    vestingInterval,
    fullAmountAtto,
    coinDenom
  );
  if (vestingCliff !== "none") {
    vestingPeriods = applyCliff(
      start
        .add(...TIME_WINDOWS_TO_DAYJS_PARAMS_MAP[vestingCliff])
        .diff(start, "second"),
      vestingPeriods
    );
  }
  console.log("here 2");
  return {
    startTime: start.unix(),
    vestingPeriods: vestingPeriods,
    lockupPeriods:
      lockingPeriod === "none"
        ? []
        : [
            {
              amount: [
                {
                  amount: fullAmountAtto.toString(),
                  denom: coinDenom,
                },
              ],
              length: start
                .add(...TIME_WINDOWS_TO_DAYJS_PARAMS_MAP[lockingPeriod])
                .diff(start, "seconds"),
            },
          ],
  };
};

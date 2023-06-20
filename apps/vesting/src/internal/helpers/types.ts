import dayjs from "dayjs";

export enum Intervals {
  "month" = "month",
  "quarter" = "quarter",
}
export enum TimeWindow {
  "4-years" = "4-years",
  "1-year" = "1-year",
  "1-month" = "1-month",
  "1-day" = "1-day",
}

export type VestingSchedule = {
  fullVestingPeriod: TimeWindow;
  vestingCliff: TimeWindow | "none";
  vestingInterval: Intervals;
  lockingPeriod: TimeWindow | "none";
};

export type PlanType = {
  fullVestingPeriod: TimeWindow;
  vestingCliff: TimeWindow | "none";
  vestingInterval: Intervals;
  lockingPeriod: TimeWindow | "none";
};

export type Period = {
  length: number;
};

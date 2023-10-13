export enum Intervals {
  "month" = "month",
  "quarter" = "quarter",
}
export enum TimeWindow {
  "4-years" = "4-years",
  "1-year" = "1-year",
  "1-month" = "1-month",
  "1-day" = "1-day",
  "none" = "none",
}

export type VestingSchedule = {
  fullVestingPeriod: TimeWindow;
  vestingCliff: TimeWindow;
  vestingInterval: Intervals;
  lockingPeriod: TimeWindow;
};

export type PlanType = {
  fullVestingPeriod: TimeWindow;
  vestingCliff: TimeWindow;
  vestingInterval: Intervals;
  lockingPeriod: TimeWindow;
};

export type Period = {
  length: number;
};

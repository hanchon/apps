import { Intervals, PlanType, TimeWindow } from "./types";

export enum PlanTypes {
  general = "general",
  grantee = "grantee",
}

export const TIME_WINDOWS_TO_DAYJS_PARAMS_MAP: Record<
  TimeWindow,
  [number, "year" | "month" | "day"]
> = {
  ["4-years"]: [4, "year"],
  ["1-year"]: [1, "year"],
  ["1-month"]: [1, "month"],
  ["1-day"]: [1, "day"],
};

export const PLAN_TYPES: Record<PlanTypes, PlanType> = {
  [PlanTypes.general]: {
    fullVestingPeriod: TimeWindow["4-years"],
    vestingCliff: TimeWindow["1-year"],
    vestingInterval: Intervals.month,
    lockingPeriod: TimeWindow["1-year"],
  },
  [PlanTypes.grantee]: {
    fullVestingPeriod: TimeWindow["1-year"],
    vestingCliff: TimeWindow["1-day"],
    vestingInterval: Intervals.month,
    lockingPeriod: TimeWindow["1-year"],
  },
};

import { Duration, getEndDate } from "./helpers";

describe("Vesting UI helpers", () => {
  it("should return true and the end date formatted", () => {
    const date = "2023-05-01";
    const vestingDuration = Duration.FourYears;
    const msg = getEndDate(date, vestingDuration);
    expect(msg).toStrictEqual([true, "05/01/2027"]);
  });

  it("should return false and the end date formatted", () => {
    const date = undefined;
    const vestingDuration = Duration.FourYears;
    const msg = getEndDate(date, vestingDuration);
    expect(msg).toStrictEqual([false, ""]);
  });
});

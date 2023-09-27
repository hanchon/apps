import { describe, expect, it } from "vitest";
import { checkAllDoneStatus } from "./helpers";
import { STEP_STATUS } from "constants-helper";

describe("Test Helpers for Progress component", () => {
  it("should return true because all steps are done", () => {
    const array = [
      { id: "0", index: 0, status: STEP_STATUS.DONE },
      { id: "1", index: 1, status: STEP_STATUS.DONE },
    ];
    const msg = checkAllDoneStatus(array);
    expect(msg).toBe(true);
  });

  it("should return false because one step is not done yet", () => {
    const array = [
      { id: "0", index: 0, status: STEP_STATUS.DONE },
      { id: "1", index: 1, status: STEP_STATUS.CURRENT },
    ];
    const msg = checkAllDoneStatus(array);
    expect(msg).toBe(false);
  });
});

import { Duration, getEndDate, isValidAccount } from "./helpers";

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

  it("should return false - Account undefined", () => {
    const account = undefined;
    const address = isValidAccount(account);
    expect(address).toBe(false);
  });

  it("should return false - Evmos account with incorrect format", () => {
    const account = "evmos1c8wg";
    const address = isValidAccount(account);
    expect(address).toBe(false);
  });

  it("should return false - Hex account with incorrect format", () => {
    const account = "0x123";
    const address = isValidAccount(account);
    expect(address).toBe(false);
  });

  it("should return true - Hex account with correct format", () => {
    // eslint-disable-next-line no-secrets/no-secrets
    const account = "0x4b87B15f560a9b77BB9965c49862cfCe720c52Ab";
    const address = isValidAccount(account);
    expect(address).toBe(account);
  });

  it("should return true - Evmos account with correct format", () => {
    // eslint-disable-next-line no-secrets/no-secrets
    const account = "evmos1fwrmzh6kp2dh0wuevhzfsck0eeeqc54tpvkvc2";
    const address = isValidAccount(account);
    expect(address).toBe(account);
  });
});

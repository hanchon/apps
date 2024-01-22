export const safeBigInt = (value: string | number | bigint) => {
  if (typeof value === "string") {
    const [safe = "0"] = value.match(/^-?\d+$/) ?? [];
    return BigInt(safe);
  }
  if (typeof value === "number") {
    return BigInt(Math.round(value));
  }
  return value;
};

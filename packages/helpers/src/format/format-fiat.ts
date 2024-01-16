export const formatFiat = (value: number) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

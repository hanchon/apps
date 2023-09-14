export const formatAmount = (amount: string, decimals: number = 7) => {
  return amount.slice(0, decimals) ?? "0";
};

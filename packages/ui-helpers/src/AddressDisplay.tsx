export const AddressDisplay = ({
  address,
  fallback,
}: {
  address?: string;
  fallback?: string;
}) => {
  if (!address) return fallback;
  if (address.startsWith("0x")) {
    return `0x${address.slice(2, 6)}…${address.slice(-4)}`;
  }

  const [prefix, tail] = address.split("1");
  return `${prefix}…${tail.slice(-4)}`;
};

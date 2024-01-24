// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export function truncateAddress(address?: string) {
  if (!address) {
    return "";
  }

  if (!address || address.length < 11) {
    return address;
  }

  // Hex Address
  if (address.startsWith("0x")) {
    return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
  }

  // Evmos1 Address
  return `${address.slice(0, 13)}...${address.slice(address.length - 6)}`;
}

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
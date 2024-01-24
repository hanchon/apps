// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const getPubUrl = () => {
  if (typeof window === "undefined") {
    if (process.env.NODE_ENV === "development") {
      return (
        process.env.VERCEL_URL ||
        process.env.NEXT_PUBLIC_VERCEL_URL ||
        `http://localhost:${process.env.PORT}`
      );
    }
    return (
      process.env.VERCEL_URL ||
      process.env.NEXT_PUBLIC_VERCEL_URL ||
      "https://staging-app.evmos.org"
    );
  }
  return window.location.origin;
};

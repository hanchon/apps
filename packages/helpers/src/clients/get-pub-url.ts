export const getPubUrl = () =>
  process.env.VERCEL_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  (typeof window === "undefined" && process.env.PORT)
    ? `http://localhost:${process.env.PORT}`
    : "";

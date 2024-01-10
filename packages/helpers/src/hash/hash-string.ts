import { sha256 } from "@noble/hashes/sha256";

export const hashString = (str: string, hashLength = 6) =>
  Buffer.from(sha256(str)).toString("base64url").slice(0, hashLength);

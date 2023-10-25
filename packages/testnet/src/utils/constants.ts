import path from "path";
const rootDir = new URL("../../../../", import.meta.url).pathname;

export const BASEDIR = path.join(rootDir, "/.testnet");
export const binariesDir = path.join(BASEDIR, "binaries");

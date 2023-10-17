import { delay } from "./delay";

export const pool = async <T>(fn: () => Promise<T | false>) => {
  while (true) {
    const result = await fn();
    if (result === false) {
      await delay(1000);
    } else {
      return result;
    }
  }
};

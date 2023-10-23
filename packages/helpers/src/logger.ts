const { log, error, trace } = console;
/**
 * This works just as console.log, but it's to be used when we intentionally want to keep logs in production.
 * using console.log directly will trigger eslint errors.
 */
export const Log = {
  info: (message: unknown, ...messages: unknown[]) => {
    log(message, ...messages);
  },
  error: (message: unknown, ...messages: unknown[]) => {
    error(message, ...messages);
  },
  trace: (message: unknown, ...messages: unknown[]) => {
    trace(message, ...messages);
  },
};

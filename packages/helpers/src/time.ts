type Ms = `${number}ms`;

type Seconds = `${number}s`;
type Minutes = `${number}m`;
type Hour = `${number}h`;
type Day = `${number}d`;

type Duration =
  | `${Day}${Hour}${Minutes}${Seconds}${Ms}`
  | `${Day}${Hour}${Minutes}${Seconds}`
  | `${Day}${Hour}${Minutes}`
  | `${Day}${Hour}`
  | Day
  | `${Hour}${Seconds}${Minutes}${Ms}`
  | `${Hour}${Seconds}${Minutes}`
  | `${Hour}${Seconds}`
  | Hour
  | `${Minutes}${Seconds}${Ms}`
  | `${Minutes}${Seconds}`
  | Minutes
  | `${Seconds}${Ms}`
  | Seconds
  | Ms;

const parseDuration = (duration: Duration) => {
  const matches = duration.match(/([\d.]+[dhms]+)/g) ?? [];

  return matches.reduce((acc, match) => {
    const [, value = "0", unit] = match.match(/([\d.]+)([dhms]+)/) ?? [];
    switch (unit) {
      case "d":
        return acc + parseFloat(value) * 86400000;

      case "h":
        return acc + parseFloat(value) * 3600000;

      case "m":
        return acc + parseFloat(value) * 60000;

      case "s":
        return acc + parseFloat(value) * 1000;

      case "ms":
        return acc + parseFloat(value);
      default:
        return acc;
    }
  }, 0);
};

export const seconds = (duration: Duration) => {
  return parseDuration(duration) / 1000;
};
export const ms = (duration: Duration) => {
  return parseDuration(duration);
};

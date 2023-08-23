import chalk, { ChalkInstance } from "chalk";

const log = (
  chalk: ChalkInstance,
  scope: string,
  message: string,
  indent = 0
) => {
  console.log(
    chalk(`[${scope}]`.padEnd(10) + `:   ${"  ".repeat(indent)}${message}`)
  );
};
const warn = (scope: string, message: string, indent = 0) =>
  log(chalk.yellow, scope, message, indent);

const error = (scope: string, message: string, indent = 0) =>
  log(chalk.red, scope, "Error: " + message, indent);

const info = (scope: string, message: string, indent = 0) =>
  log(chalk.white, scope, message, indent);

const success = (scope: string, message: string, indent = 0) =>
  log(chalk.green, scope, message, indent);

export const logger = {
  warn,
  error,
  info,
  success,
};

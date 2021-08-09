import chalk from "chalk";
import { fileURLToPath } from "url";
import { dirname } from "path";

const logger = console;

export function paddedLog(message: string) {
  const newMessage = message
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n");

  logger.log(newMessage);
}

export const commandLog = (message: string) => {
  process.stdout.write(chalk.cyan(" • ") + message);

  // Need `void` to be able to use this function in a then of a Promise<void>
  return (errorMessage?: string | void, errorInfo?: string) => {
    if (errorMessage) {
      process.stdout.write(`. ${chalk.red("✖")}\n`);
      logger.error(`\n     ${chalk.red(errorMessage)}`);

      if (!errorInfo) {
        return;
      }

      const newErrorInfo = errorInfo
        .split("\n")
        .map((line) => `     ${chalk.dim(line)}`)
        .join("\n");
      logger.error(`${newErrorInfo}\n`);
      return;
    }

    process.stdout.write(`. ${chalk.green("✓")}\n`);
  };
};
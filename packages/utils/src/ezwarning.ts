import chalk from 'chalk';

export function ezWarning(msg: string, logger?: any) {
  if (process.env.NODE_ENV === 'test') return
  const warningMsg = '⚠️ ' + chalk.yellow(msg);
  if (logger) {
    logger.log(warningMsg);
  } else {
    console.log(warningMsg);
  }
}

import chalk from 'chalk';

export function ezWarning(msg: string, logger?: any) {
    const warningMsg = '⚠️ ' + chalk.yellow(msg)
    if (logger) {
        logger.log(warningMsg)
    } else {
        console.log(warningMsg)
    }
}

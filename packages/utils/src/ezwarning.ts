import chalk from 'chalk'

export function ezWarning(msg:string) {
    console.log('⚠️ ',chalk.yellow(msg))
}
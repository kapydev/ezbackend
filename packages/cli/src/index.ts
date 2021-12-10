import { Command } from 'commander';
import { sync as readPackageUpSync } from 'read-pkg-up';
import initiate from './initiate';

const pkg = readPackageUpSync({ cwd: __dirname })?.packageJson;

const program = new Command();

program
  .command('init <dir>')
  .description(
    'Initialize ezbackend into your project in the specified directory.',
  )
  .option('-f --force', 'Force add ezbackend')
  .option('--no-install', 'Do not add libraries')
  .option('--yarn', 'Install with Yarn instead of NPM')
  .action((dir, options) => initiate(dir, options, pkg));

program.parse(process.argv);

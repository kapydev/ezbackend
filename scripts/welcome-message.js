const chalk = require('chalk');

console.log(
  chalk.green(`
Welcome to EzBackend! Common commands:

First time setup:     yarn build:full
Build in watch mode:  yarn build
Testing:              yarn test
Linting:              yarn lint
Formatting:           yarn format
Installing Libraries: yarn
`),
);

// Important note, ora cannot be updated due to ESM vs the other type of require issue thingy
const ora = require('ora');
const path = require('path');
const chalk = require('chalk');

const buildSteps = [
  'yarn-check',
  'husky-install',
  'run-build',
  'build-react-apps',
  'print-env-setup-instructions',
];

function runBuild() {
  console.log(
    chalk.green('This script needs to be launched from the monorepo root'),
  );
  console.log(
    chalk.green(
      'Starting build process. You can skip this when you run yarn with the flag --ignore-scripts',
    ),
  );

  buildSteps.forEach((stepName) => {
    const stepPath = path.join(__dirname, stepName);
    const step = require(stepPath);
    const spinner = ora(chalk.blueBright(step.desc)).start();
    const result = step.exec();
    if (result?.status === 0) {
      spinner.succeed();
    } else {
      spinner.fail();
      process.exit(1);
    }
  });
}

runBuild();

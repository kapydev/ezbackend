const chalk = require('chalk');

function printEnvSetupInstructions() {
  console.log(
    chalk.green(
      `
Setup complete! You may need to setup the below items (in vscode) to properly use the monorepo

1. Set indentation to 2 spaces https://www.kindacode.com/article/vs-code-how-to-change-indentation-2-spaces-4-spaces/
2. Set prettier as the default linter https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
3. Setup environment variables in monorepo root .env
4. Run 'yarn test' to ensure everything is running as expected

You can also use 'yarn build' in order to build each package in the monorepo in watch mode for quick debugging
`,
    ),
  );
  return {
    status: 0,
  };
}

module.exports = {
  exec: printEnvSetupInstructions,
  desc: 'Printing short readme for further setup instructions',
};

import chalk from "chalk";
import { ProjectType } from "./project-types";
import { isEzbInstalled } from "./detect";
import { readPackageJson } from "./js-package-manager";
import { JsPackageManagerFactory } from "./js-package-manager/JsPackageManagerFactory";
import { paddedLog } from "./helpers";
import { commandLog } from "./helpers";
import defaultGenerator from './generators/DEFAULT'


//TODO: Seperate the cli from the server to reduce load time
const logger = console;

type initiateOptions = {
  force?: boolean
}

export default function initiate(options: initiateOptions, pkg: any) {
  const welcomeMessage =
    "EzBackend - An extensible backend optimised for the developer experience";
  logger.log(chalk.inverse(`\n ${welcomeMessage} \n`));

  let projectType;

  const ezbInstalled = isEzbInstalled(readPackageJson(), options.force);
  projectType = ezbInstalled
    ? ProjectType.ALREADY_HAS_EZB
    : ProjectType.DEFAULT;

  return installEzb(projectType);
}

const installEzb = (projectType: ProjectType) => {

  const packageManager = JsPackageManagerFactory.getPackageManager()

  const runGenerator: () => Promise<void> = () => {
    switch (projectType) {
      case ProjectType.ALREADY_HAS_EZB:
        logger.log();
        paddedLog("EzBackend seems to already be available in this project. You can override this with the -f flag");
        logger.log();
        return Promise.resolve();
      case ProjectType.DEFAULT:
        return defaultGenerator(packageManager).then(
          commandLog("Adding EzBackend to your app")
        );
      default:
        paddedLog(
          `We could not detect your project type. (code: ${projectType}`
        );
        return Promise.resolve()
    }
  };

  return runGenerator().catch((ex) => {
    logger.error(`\n     ${chalk.red(ex.stack)}`);
    process.exit(1);
  });
};

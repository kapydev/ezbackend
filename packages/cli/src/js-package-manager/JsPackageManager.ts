import { sync as spawnSync } from "cross-spawn";
import { commandLog } from "../helpers";
import { PackageJsonWithDepsAndDevDeps, PackageJson } from "./PackageJson";
import { readPackageJson, writePackageJson } from "./PackageJsonHelper";


const logger = console

export abstract class JsPackageManager {
  public abstract readonly type: "npm" | "yarn1" | "yarn2";

  public abstract initPackageJson(): void;

  public abstract getRunEzbCommand(): string;

  public abstract getRunCommand(command: string): string;

  /**
   * Install dependecies listed in package.json
   */
  public installDependencies(): void {
    commandLog("Installing dependencies");
  }

  public addEzbCommandInScripts() {

    //TODO: See if there is a better way than ts-node
    //TODO: Programmatically get the file path instead
    const ezbCmd = `npx ts-node node_modules/ezbackend start`
    this.addScripts({
      ezb: ezbCmd
    })
  }

  public addScripts(scripts: Record<string,string>) {
    const packageJson = this.retrievePackageJson()
    writePackageJson({
      ...packageJson,
      scripts: {
        ...packageJson.scripts,
        ...scripts
      }
    })
  }

  /**
   * Read the `package.json` file available in the directory the command was call from
   * If there is no `package.json` it will create one.
   */
  public retrievePackageJson(): PackageJsonWithDepsAndDevDeps {
    let packageJson = readPackageJson();
    if (!packageJson) {
      // It will create a new package.json file
      this.initPackageJson();

      // read the newly created package.json file
      packageJson = readPackageJson() || {};
    }

    return {
      ...packageJson,
      dependencies: { ...packageJson.dependencies },
      devDependencies: { ...packageJson.devDependencies },
    };
  }

  public executeCommand(
    command: string,
    args: string[],
    stdio?: "pipe" | "inherit"
  ): string {
    const commandResult = spawnSync(command, args, {
      stdio: stdio ?? "pipe",
      encoding: "utf-8",
    });

    if (commandResult.status !== 0) {
      throw new Error(commandResult.stderr ?? "");
    }

    return commandResult.stdout ?? "";
  }

  /**
   * Add dependencies to a project using `yarn add` or `npm install`.
   *
   * @param {Object} options contains `skipInstall`, `packageJson` and `installAsDevDependencies` which we use to determine how we install packages.
   * @param {Array} dependencies contains a list of packages to add.
   * @example
   * addDependencies(options, [
   *   `@ezbackend/addon-actions@${actionsVersion}`,
   * ]);
   */
  public addDependencies(
    options: {
      skipInstall?: boolean;
      installAsDevDependencies?: boolean;
      //TODO: Figure out why the storybook one doesn't need this to be required
      packageJson: PackageJson;
    },
    dependencies: string[]
  ): void {
    const { skipInstall } = options;

    if (skipInstall) {
      const { packageJson } = options;

      const dependenciesMap = dependencies.reduce((acc, dep) => {
        const [packageName, packageVersion] = getPackageDetails(dep);
        return { ...acc, [packageName]: packageVersion };
      }, {});

      if (options.installAsDevDependencies) {
        packageJson.devDependencies = {
          ...packageJson.devDependencies,
          ...dependenciesMap,
        };
      } else {
        packageJson.dependencies = {
          ...packageJson.dependencies,
          ...dependenciesMap,
        };
      }

      writePackageJson(packageJson);
    } else {
      try {
        this.runAddDeps(dependencies, options.installAsDevDependencies ?? true);
      } catch (e) {
        logger.error("An error occurred while installing dependencies.");
        logger.log(e.message);
        process.exit(1);
      }
    }
  }

  protected abstract runAddDeps(dependencies: string[], installAsDevDependencies: boolean): void;
}

export function getPackageDetails(pkg: string): [string, string?] {
    const idx = pkg.lastIndexOf('@');
    // If the only `@` is the first character, it is a scoped package
    // If it isn't in the string, it will be -1
    if (idx <= 0) {
      return [pkg, undefined];
    }
    const packageName = pkg.slice(0, idx);
    const packageVersion = pkg.slice(idx + 1);
    return [packageName, packageVersion];
  }
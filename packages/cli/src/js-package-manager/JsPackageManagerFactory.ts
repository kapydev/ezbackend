import { sync as spawnSync } from "cross-spawn";
import { sync as findUpSync } from "find-up";
// TODO: Figure out why all the other packages can compile without js
import { Yarn1Proxy } from "./Yarn1Proxy";
import { Yarn2Proxy } from "./Yarn2Proxy";
import { NPMProxy } from "./NPMProxy";
import { InitiateOptions } from "../initiate";

export class JsPackageManagerFactory {
  public static getPackageManager(options: InitiateOptions) {
    const yarnVersion = getYarnVersion();
    const hasYarnLockFile = findUpSync("yarn.lock");

    const hasNPMCommand = hasNPM();

    if (options.yarn || (yarnVersion && (hasYarnLockFile || !hasNPMCommand))) {
      return yarnVersion === 1 ? new Yarn1Proxy() : new Yarn2Proxy();
    }

    if (hasNPMCommand) {
      return new NPMProxy();
    }

    throw new Error(
      "Unable to find a usable package manager within NPM, Yarn and Yarn 2",
    );
  }
}

function hasNPM() {
  const npmVersionCommand = spawnSync("npm", ["--version"]);
  return npmVersionCommand.status === 0;
}

function getYarnVersion(): 1 | 2 | undefined {
  const yarnVersionCommand = spawnSync("yarn", ["--version"]);

  if (yarnVersionCommand.status !== 0) {
    return undefined;
  }

  const yarnVersion = yarnVersionCommand.output
    .toString()
    .replace(/,/g, "")
    .replace(/"/g, "");

  return /^1\.+/.test(yarnVersion) ? 1 : 2;
}

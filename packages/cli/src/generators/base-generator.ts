import fse from "fs-extra";
import path from "path";
import { JsPackageManager } from "../js-package-manager/JsPackageManager";
import { InitiateOptions } from "../initiate";

function installDependencies(packageManager: JsPackageManager) {
  // TODO: Think about moving these values away into a config file for ease
  const packageJson = packageManager.retrievePackageJson();

  const dependencies = [
    "@ezbackend/core",
    "@ezbackend/common",
    "@ezbackend/cors",
    "@ezbackend/utils",
  ];
  packageManager.addDependencies(
    {
      packageJson: packageJson,
      installAsDevDependencies: false,
    },
    dependencies,
  );
  const devDependencies = [
    "@ezbackend/openapi",
    "@ezbackend/db-ui",
    "ts-node-dev",
    "typescript",
    "@types/node",
  ];
  packageManager.addDependencies(
    {
      packageJson: packageJson,
      installAsDevDependencies: true,
    },
    devDependencies,
  );
}

export async function baseGenerator(
  packageManager: JsPackageManager,
  options: InitiateOptions,
) {
  // TODO: Think about a possible need for versioning dependencies for different project types
  // TODO: Think about keep this DRY with the common framework
  // TODO: Make lerna publish run prepare, and make prepare run tsc build

  if (options.install) installDependencies(packageManager);

  packageManager.addEzbCommandInScripts();
  copyBoilerPlate();
}

export function copyBoilerPlate() {
  const boilerPlatePath = () => {
    // TODO: Update to suport different frameworks, etc
    // TODO: Make this not have to do some ridiculous relative pathing because of the compiled location
    const defaultPath = path.resolve(__dirname, "../../", `frameworks/common`);
    return defaultPath;
  };

  const rootBoilerPlatePath = () => {
    const defaultPath = path.resolve(
      __dirname,
      "../../",
      `frameworks/root-files`,
    );
    return defaultPath;
  };

  const getTargetPath = () => {
    return "./src";
  };

  const getTargetRootPath = () => {
    return `.`;
  };

  fse.copySync(boilerPlatePath(), getTargetPath(), { overwrite: true });

  fse.copySync(rootBoilerPlatePath(), getTargetRootPath(), {
    overwrite: false,
  });
}

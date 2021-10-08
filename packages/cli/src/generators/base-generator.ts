import fse from "fs-extra";
import path from "path";
import { JsPackageManager } from "../js-package-manager/JsPackageManager";

export async function baseGenerator(packageManager: JsPackageManager) {
  const packageJson = packageManager.retrievePackageJson();
  //TODO: Think about a possible need for versioning dependencies for different project types
  //TODO: Think about keep this DRY with the common framework
  //TODO: Make lerna publish run prepare, and make prepare run tsc build
  //TODO: Think about moving these values away into a config file for ease
  const dependencies = [
    "@ezbackend/core",
    "@ezbackend/common",
    "@ezbackend/cors",
    "@ezbackend/utils",

  ]
  //LEFT OFF
  packageManager.addDependencies({
    packageJson: packageJson,
    installAsDevDependencies: false
  }, dependencies);
  const devDependencies = [
    "@ezbackend/openapi",
    "@ezbackend/db-ui",
    "ts-node-dev",
    "typescript",
    "@types/node"
  ]
  packageManager.addDependencies({
    packageJson: packageJson,
    installAsDevDependencies: true
  }, devDependencies);
  packageManager.addEzbCommandInScripts()
  copyBoilerPlate();
}

export function copyBoilerPlate() {
  const boilerPlatePath = () => {
    //TODO: Update to suport different frameworks, etc
    //TODO: Make this not have to do some ridiculous relative pathing because of the compiled location
    const defaultPath = path.resolve(__dirname, '../../', `frameworks/common`);
    return defaultPath;
  };

  const rootBoilerPlatePath = () => {
    const defaultPath = path.resolve(__dirname, '../../', `frameworks/root-files`);
    return defaultPath;
  }

  const getTargetPath = () => {
    return "./src";
  };

  const getTargetRootPath = () => {
    return `.`
  }

  fse.copySync(boilerPlatePath(), getTargetPath(), { overwrite: true });

  fse.copySync(rootBoilerPlatePath(), getTargetRootPath(), { overwrite: false });


}

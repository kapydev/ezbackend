import fse from "fs-extra";
import path from "path";
import { JsPackageManager } from "../js-package-manager/JsPackageManager";

export async function baseGenerator(packageManager: JsPackageManager) {
  const packageJson = packageManager.retrievePackageJson();
  //TODO: Think about a possible need for versioning dependencies for different project types
  //TODO: Think about keep this DRY with the common framework
  //TODO: Think if these should be dev or normal dependencies (Right now they are dev)
  //TODO: Make lerna publish run prepare, and make prepare run tsc build
  const dependencies = [
    "@ezbackend/core",
    "@ezbackend/common",
    "@ezbackend/openapi",
    "@ezbackend/cors",
    "@ezbackend/db-ui",
    "ts-node-dev",
    "typescript",
    "@types/node"
  ]
  packageManager.addDependencies({ packageJson: packageJson }, dependencies);
  packageManager.addEzbCommandInScripts()
  copyBoilerPlate();
}

export function copyBoilerPlate() {
  const boilerPlatePath = () => {
    //TODO: Update to suport different frameworks, etc
    //TODO: Make this not have to do some ridiculous relative pathing because of the compiled location
    const defaultPath = path.resolve(__dirname,'../../', `frameworks/common`);
    return defaultPath;
  };

  const targetPath = () => {
    return "./.ezb";
  };

  const destinationPath = targetPath();
  fse.copySync(boilerPlatePath(), destinationPath, { overwrite: true });
}

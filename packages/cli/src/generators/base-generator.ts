import fse from "fs-extra";
import path from "path";
import { JsPackageManager } from "../js-package-manager/JsPackageManager";

export async function baseGenerator(packageManager: JsPackageManager) {
  const packageJson = packageManager.retrievePackageJson();
  //TODO: Think about a possible need for versioning dependencies for different project types
  packageManager.addDependencies({ packageJson: packageJson }, ["ezbackend"]);
  packageManager.addEzbCommandInScripts()
  copyBoilerPlate();
}

export function copyBoilerPlate() {
  const boilerPlatePath = () => {
    //TODO: Update to suport different frameworks, etc
    //TODO: Make this not have to do some ridiculous relative pathing because of the compiled location
    console.log(__dirname)
    const defaultPath = path.resolve(__dirname,'../../../cli', `frameworks/common`);
    console.log(defaultPath)
    return defaultPath;
  };

  const targetPath = () => {
    return "./.ezb";
  };

  const destinationPath = targetPath();
  fse.copySync(boilerPlatePath(), destinationPath, { overwrite: true });
}

import { JsPackageManager } from "../../js-package-manager/JsPackageManager";
import { baseGenerator } from "../base-generator";
import { InitiateOptions } from "../../initiate";

export default async function generator(
  packageManager: JsPackageManager,
  options: InitiateOptions,
) {
  baseGenerator(packageManager, options);
}

import { JsPackageManager } from '../../js-package-manager/JsPackageManager';
import {baseGenerator} from '../base-generator'
import {initiateOptions} from "../../initiate"

export default async function generator(packageManager: JsPackageManager,options: initiateOptions) {
    
    baseGenerator(packageManager,options)
}
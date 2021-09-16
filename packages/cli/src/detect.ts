import { PackageJson } from "read-pkg-up";
import { ProjectType } from "./project-types";

export function isEzbInstalled(dependencies: PackageJson| false, force?:boolean) {
    if (!dependencies) {
        return false
    }

    if (!force && dependencies.dependencies) {
        if (dependencies.dependencies[`@ezbackend/core`]) {
            return ProjectType.ALREADY_HAS_EZB
        }
    }

    return false
}
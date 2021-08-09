import path from 'path';
import fs from 'fs';
import { PackageJson } from './PackageJson';

export function readPackageJson(): PackageJson | false {
  const packageJsonPath = path.resolve('package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }

  const jsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  return JSON.parse(jsonContent);
}

export function writePackageJson(packageJson: PackageJson) {
  const content = `${JSON.stringify(packageJson, null, 2)}\n`;
  const packageJsonPath = path.resolve('package.json');

  fs.writeFileSync(packageJsonPath, content, 'utf8');
}

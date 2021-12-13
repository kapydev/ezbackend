import { JsPackageManager } from './JsPackageManager';

export class Yarn1Proxy extends JsPackageManager {
  readonly type = 'yarn1';

  initPackageJson() {
    return this.executeCommand('yarn', ['init', '-y']);
  }

  getRunEzbCommand(): string {
    return `yarn ezb`;
  }

  getRunCommand(command: string): string {
    return `yarn ${command}`;
  }

  protected runAddDeps(
    dependencies: string[],
    installAsDevDependencies: boolean,
  ): void {
    let args = ['--ignore-workspace-root-check', ...dependencies];

    if (installAsDevDependencies) {
      args = ['-D', ...args];
    }

    this.executeCommand('yarn', ['add', ...args], 'inherit');
  }
}

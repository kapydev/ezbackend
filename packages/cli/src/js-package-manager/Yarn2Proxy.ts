import { JsPackageManager } from './JsPackageManager';

export class Yarn2Proxy extends JsPackageManager {
  readonly type = 'yarn2';

  initPackageJson() {
    return this.executeCommand('yarn', ['init']);
  }

  getRunEzbCommand(): string {
    return 'yarn ezb';
  }

  getRunCommand(command: string): string {
    return `yarn ${command}`;
  }

  protected runAddDeps(dependencies: string[], installAsDevDependencies: boolean): void {
    let args = [...dependencies];

    if (installAsDevDependencies) {
      args = ['-D', ...args];
    }

    this.executeCommand('yarn', ['add', ...args], 'inherit');
  }


}

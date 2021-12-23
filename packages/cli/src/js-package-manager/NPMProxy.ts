import { JsPackageManager } from './JsPackageManager';

export class NPMProxy extends JsPackageManager {
  readonly type = 'npm';

  installArgs: string[] | undefined;

  initPackageJson() {
    return this.executeCommand('npm', ['init', '-y']);
  }

  getRunEzbCommand(): string {
    return 'npm run storybook';
  }

  getRunCommand(command: string): string {
    return `npm run ${command}`;
  }

  getInstallArgs(): string[] {
    this.installArgs = ['install'];
    return this.installArgs;
  }

  protected runInstall(): void {
    this.executeCommand('npm', this.getInstallArgs(), 'inherit');
  }

  protected runAddDeps(
    dependencies: string[],
    installAsDevDependencies: boolean,
  ): void {
    let args = [...dependencies];

    if (installAsDevDependencies) {
      args = ['-D', ...args];
    }

    this.executeCommand('npm', [...this.getInstallArgs(), ...args], 'inherit');
  }
}

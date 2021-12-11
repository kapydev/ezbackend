const { sync } = require('cross-spawn');

function getYarnVersion() {
  const yarnVersionCommand = sync('yarn', ['--version']);

  if (yarnVersionCommand.status !== 0) {
    return undefined;
  }

  const yarnVersion = yarnVersionCommand.output
    .toString()
    .replace(/,/g, '')
    .replace(/"/g, '');

  return /^1\.+/.test(yarnVersion) ? 1 : 2;
}

function yarnCheck() {
  const yarnVer = getYarnVersion();
  if (yarnVer === undefined) {
    throw new Error(
      'The EzBackend monorepo is configure to work with yarn workspaces, so you need to install yarn',
    );
  }
  return {
    status: 0,
  };
}

module.exports = {
  exec: yarnCheck,
  desc: 'Checking if user has yarn installed',
};

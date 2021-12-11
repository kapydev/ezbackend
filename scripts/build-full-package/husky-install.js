const { sync } = require('cross-spawn');

function huskyInstall() {
  return sync('npx husky install', { stdio: 'inherit', cwd: process.cwd() });
}

module.exports = {
  exec: huskyInstall,
  desc: 'Installing Husky (For git hooks auto linting)',
};

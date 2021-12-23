const { sync } = require('cross-spawn');

console.log(process.cwd());

function runBuild() {
  return sync('yarn', ['build', '--all'], {
    stdio: 'inherit',
    cwd: process.cwd(),
  });
}

module.exports = {
  exec: runBuild,
  desc: 'Building all monorepo packages with `yarn build --all`',
};

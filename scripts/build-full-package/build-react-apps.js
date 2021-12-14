const { sync } = require('cross-spawn');
const fs = require('fs');
const path = require('path');

const reactBuildPaths = [
  ['crypto', 'web3-login-ui'],
  ['db-ui', 'ezbackend-database-ui'],
  ['docs'],
];

function skipPreflightDBUI() {
  const filePath = path.join(
    process.cwd(),
    'packages',
    'db-ui',
    'ezbackend-database-ui',
    '.env',
  );
  fs.writeFileSync(filePath, 'SKIP_PREFLIGHT_CHECK=true');
}

function buildReactApps() {
  skipPreflightDBUI(); // Required due to monorepo having multiple package jsons

  for (const buildPath of reactBuildPaths) {
    const appPath = path.join(process.cwd(), 'packages', ...buildPath);
    const result = sync('yarn', ['&&', 'yarn', 'build'], {
      stdio: 'inherit',
      cwd: appPath,
    });
    if (result.status !== 0) {
      return result;
    }
  }

  return {
    status: 0,
  };
}

module.exports = {
  exec: buildReactApps,
  desc: 'Building all internally used React Apps',
};

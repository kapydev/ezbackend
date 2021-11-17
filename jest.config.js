//TODO: Somehow move this to the parent folder and have children use this config
/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    "/node_modules/",
    // eslint-disable-next-line no-useless-escape
    "(\.js)$"
  ]
};


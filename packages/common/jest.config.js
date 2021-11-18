//TODO: Somehow move this to the parent folder and have children use this config
/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // transform: {
  //   '^.+\\.(t|j)sx?$': '@swc/jest',
  // },
  preset: 'ts-jest',
  testEnvironment: 'node',
};
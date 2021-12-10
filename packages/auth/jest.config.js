import parentConfig from '../../jest.config';

const config = {
  ...parentConfig,
  globals: {
    'ts-jest': {
      mapCoverage: true,
    },
  },
};

export default config;

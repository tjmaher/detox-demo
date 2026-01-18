/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.test.ts'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: [
    'detox/runners/jest/reporter',
    [
      'jest-allure2-reporter',
      {
        extends: 'detox-allure2-adapter/preset-allure',
        resultsDir: 'allure-results',
      },
    ],
  ],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
  testEnvironmentOptions: {
    eventListeners: [
      'jest-metadata/environment-listener',
      'jest-allure2-reporter/environment-listener',
      [
        'detox-allure2-adapter',
        {
          enabled: true,
          deviceLogs: true,
          deviceScreenshots: true,
          deviceVideos: true,
          deviceViewHierarchy: true,
        },
      ],
    ],
  },
};

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.test.ts'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
  
  reporters: [
    'detox/runners/jest/reporter',
    [
      'jest-allure2-reporter',
      {
        extends: 'detox-allure2-adapter/preset-allure',
        resultsDir: 'allure-results',
        testCaseNameTemplate: '{ancestorTitles} {title}',
        suiteNameTemplate: '{filepath}',
      },
    ],
  ],

  testEnvironmentOptions: {
    eventListeners: [
      'jest-metadata/environment-listener',
      'jest-allure2-reporter/environment-listener',
      [
        'detox-allure2-adapter',
        {
          enabled: true,
        },
      ],
    ],
  },
};

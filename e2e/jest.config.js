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
        resultsDir: 'allure-results',
        testCaseNameTemplate: '{ancestorTitles} {title}',
        suiteNameTemplate: '{filepath}',
        overwrite: false,
        attachments: true,
        // Critical: Add these to ensure proper Allure integration
        testCasePropertiesMode: 'merge',
        attachmentsBaseURL: 'attached://'
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
          // Add explicit configuration
          attachmentsSubDir: 'attachments',
        },
      ],
    ],
  },
};

module.exports = {
  preset: 'react-native',
  reporters: [
    'detox/runners/jest/reporter',
    ['jest-allure2-reporter', {
      extends: 'detox-allure2-adapter/preset-allure',
      /* see https://github.com/wix-incubator/jest-allure2-reporter/blob/beta/index.d.ts */
    }],
  ],
  testEnvironmentOptions: {
    eventListeners: [
      'jest-metadata/environment-listener',
      'jest-allure2-reporter/environment-listener',
      ['detox-allure2-adapter', {
        deviceLogs: true,
        deviceScreenshots: true,
        deviceVideos: true,
        deviceViewHierarchy: true,
      }],
    ],
  },
};

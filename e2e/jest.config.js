/** @type {import('@jest/types').Config.InitialOptions} */
const path = require('path');

// jest-allure2-reporter has ESM compatibility issues on Windows
// ESM (ECMAScript Module) compatibility issues occur when a package expects ES modules (import/export) but the environment expects CommonJS (require/module.exports).
// On Windows, jest-allure2-reporter and Detox/Allure integrations may fail to load ESM modules, causing errors like "Cannot use import statement outside a module".
// See:
//   https://github.com/allure-framework/allure-js/issues/352
//   https://github.com/wix-incubator/detox-allure2-adapter/issues/7

const isWindows = process.platform === 'win32';

// Only enable Allure when explicitly opted-in via DETOX_ENABLE_ALLURE=true, first defined and set by me in 
//   .github/workflows/android-regression.yml
// This is disabled for Android due to videokitten/scrcpy recording issues
const useAllure = process.env.DETOX_ENABLE_ALLURE === 'true';

const reporters = ['detox/runners/jest/reporter'];

// Only add Allure reporter on non-Windows platforms when enabled due to ESM issues
if (!isWindows && useAllure) {
  reporters.push([
    'jest-allure2-reporter',
    {
      extends: 'detox-allure2-adapter/preset-allure',
      resultsDir: 'allure-results',
    },
  ]);
}

const eventListeners = [];

// Only add Allure event listener when enabled (not on Windows, not on Android)
if (!isWindows && useAllure) {
  eventListeners.push([
    'detox-allure2-adapter',
    {
      enabled: true,
      deviceLogs: true,
      deviceScreenshots: true,
      deviceVideos: true,
      deviceViewHierarchy: true,
    },
  ]);
}

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  testMatch: [
    '<rootDir>/e2e/login.test.ts',      // Run login first
    '<rootDir>/e2e/securearea.test.ts', // Then secure area
  ],
  testTimeout: 180000,
  detectOpenHandles: true,
  maxWorkers: 1,
  globalSetup: require.resolve('detox/runners/jest/globalSetup'),
  globalTeardown: require.resolve('detox/runners/jest/globalTeardown'),
  reporters: reporters,
  testEnvironment: require.resolve('detox/runners/jest/testEnvironment'),
  verbose: true,
  testEnvironmentOptions: {
    eventListeners: eventListeners,
  },
};

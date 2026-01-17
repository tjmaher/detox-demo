/** @type {Detox.DetoxConfig} */
module.exports = {
  extends: "detox-allure2-adapter/preset-detox",
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js'
    },
    jest: {
      reporters: [
        'default',
        ['detox-allure2-adapter/reporter', {
          outputDir: 'allure-results'
        }]
      ]
    }
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/DetoxDemo.app',
      build: 'xcodebuild -workspace ios/DetoxDemo.xcworkspace -scheme DetoxDemo -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 16 Pro'
      }
    }
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug'
    }
  },
  artifacts: {
    plugins: {
      screenshot: 'failing',
      video: 'failing', 
      instruments: 'none',
      log: 'failing',
      uiHierarchy: 'failing'
    }
  }
};

/** @type {Detox.DetoxConfig} */

// Only use Allure adapter for iOS. Android video recording not currently supported
const useAllure = process.env.DETOX_ENABLE_ALLURE === 'true';

// Cross-platform Gradle command (Windows uses gradlew.bat, Unix uses ./gradlew)
const isWindows = process.platform === 'win32';
const gradleCmd = isWindows 
  ? 'cd android && gradlew.bat assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..'
  : 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..';

module.exports = {
  ...(useAllure ? { extends: 'detox-allure2-adapter/preset-detox' } : {}),
  
  artifacts: {
    rootDir: 'artifacts',
    plugins: {
      screenshot: 'failing',
      video: 'failing',
      log: 'failing',
      uiHierarchy: 'failing',
    }
  },
  
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js'
    }
  },
  
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/DetoxDemo.app',
      build: 'xcodebuild -workspace ios/DetoxDemo.xcworkspace -scheme DetoxDemo -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: gradleCmd
    }
  },
  
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 16'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_5_API_33'
      }
    }
  },
  
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug'
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug'
    }
  }
};

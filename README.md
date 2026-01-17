# Detox Demo - React Native iOS App

DetoxDemo is a React Native application demonstrating Wix's [Detox](https://wix.github.io/Detox/), a grey-box end-to-end automated testing framework built to test React Native applications.  

DetoxDemo, the app under test, was constructed by GitHub CoPilot via prompts from T.J. Maher. The automation framework was lovingly crafted by hand, with locators artisinally wrapped in page objects by T.J. Maher. You can read more about the hectic journey GitHub CoPilot took at: [First Time Using GitHub CoPilot to Create a ReactNative LoginPage app. What Could Go Wrong?](https://www.linkedin.com/pulse/first-time-using-github-copilot-create-reactnative-app-maher-jr--1iaoe/)

DetoxDemo is based on Dave Haefner's [The - Internet / Login](http://the-internet.herokuapp.com/login), a site where T.J. Maher taught himself automation development writing Selenium + Java tests against it back in July 2015 in his project "Testing The-Internet" ([See Blog](https://www.tjmaher.com/p/programming-projects.html)). 

T.J. has been a Software Test Engineer at [SELF ID](https://selfid.com/) since July 2025 putting together a UI automation framework for their SELF ID React Native mobile app ( [Download iOS app](https://apps.apple.com/us/app/self-id/id1663745416) ) where users can create, store, and share their digital identity. This project was created since T.J. Maher will be blogging about what he has learned and needed a React Mobile app to test against. T.J. will be giving a talk about his experience putting the framework together in April 2026 to Joe Colantonio's [Automation Guild](https://testguild.com/). 

T.J. Maher has been blogging about writing test automation for over ten years on his site, [Adventures in Automation](https://www.tjmaher.com/2015/06/simple-manipulation-of-login-page.html), writing [toy projects](https://www.tjmaher.com/p/programming-projects.html) to help him practice what he is doing on the job, and writing [articles](https://www.tjmaher.com/p/media.html) and [courses](https://testautomationu.applitools.com/capybara-ruby/) about test automation. Other coding projects can be found at https://github.com/tjmaher . T.J. is @tjmaher1 on [BlueSky](https://bsky.app/profile/tjmaher1.bsky.social), [LinkedIn](https://www.linkedin.com/in/tjmaher1/), and [Twitter](https://x.com/tjmaher1).

If you find this project helpful, feel free to copy it for your own education. 

## Features

### Login Screen
- **Heading**: "Login Page"
- **Instructions**: Guided instructions with username and password information
- **Username Input**: Text input for username (use "tomsmith")
- **Password Input**: Secure text input for password (use "SuperSecretPassword!")
- **Login Button**: Triggers authentication
- **Error Banner**: Red banner with white bold text for invalid credentials: "Your username is invalid!"
- **Success Messages**: Green banners illustrating a successful logout.

### Secure Area Screen
- **Heading**: "Secure Area" 
- **Welcome Text**: "Welcome to the Secure Area. When you are done click logout below."
- **Success Banner**: Green banner with "You logged into a secure area!"
- **Logout Button**: Returns to login screen with success message

### Navigation Flow
1. Login Screen → (valid credentials) → Secure Area Screen
2. Secure Area Screen → (logout) → Login Screen (with logout success message)
3. Login Screen → (invalid credentials) → Error message display

### Test Reporting
- **Allure Reports**: Comprehensive test reports with visual artifacts for debugging
- **Live Results**: View test execution results at https://tjmaher.github.io/detox-demo/ios/
- **CI Integration**: Automated report generation on GitHub Actions with iPhone 16 Pro simulator
- **Failure Artifacts**: Screenshots, videos, and logs captured

## Test Credentials
- **Username**: `tomsmith`
- **Password**: `SuperSecretPassword!`

## Project Structure

```
src/
├── screens/
│   ├── LoginScreen.tsx       # Main login interface
│   └── SecureAreaScreen.tsx  # Secure area after login

e2e/
├── pages/
│   ├── base-page.ts          # Base page object with common methods
│   ├── login-page.ts         # Login screen page object  
│   └── secure-area-page.ts   # Secure area page object
├── constants.ts              # Time constants (TEN_SECONDS, etc.)
├── credentials.ts            # Test credentials (tomsmith/SuperSecretPassword!)
├── init.ts                   # Detox initialization
├── jest.config.js           # Jest configuration for Detox tests
├── login.test.ts            # Login functionality test suite
└── securearea.test.ts       # Secure area test suite

.github/
└── workflows/
    └── ios-regression.yml    # GitHub Actions CI/CD pipeline

ios/                          # iOS native project files
android/                      # Android native project files (if applicable)

.detoxrc.js                  # Detox configuration with iPhone 16 Pro
jest.config.js               # React Native unit tests configuration
package.json                 # Dependencies and scripts
```

## Setup & Installation

### Prerequisites
- Node.js (>= 20)
- Xcode (for iOS development)
- iOS Simulator with iPhone 16 Pro
- React Native development environment ([Setup Guide](https://reactnative.dev/docs/set-up-your-environment))
- Homebrew (for macOS dependencies)

### Install Dependencies
```bash
# Install Node.js dependencies
yarn install

# Install Ruby dependencies for CocoaPods
bundle install
```

### iOS Setup
```bash
# Install CocoaPods dependencies
cd ios && pod install && cd ..

# Install Detox CLI globally
yarn global add detox-cli

# Install applesimutils, for Detox iOS testing
brew tap wix/brew
brew install applesimutils
```

### Detox Setup
```bash
# Build the iOS app for testing
yarn detox:build:ios

# Run Detox tests on iPhone 16 Pro simulator
yarn detox:test:ios
```

### Allure Reporting Setup (Optional)
```bash
# Install Allure CLI for local report generation
brew install allure

# Generate and view reports locally after running tests
allure generate allure-results --clean -o allure-report
allure open allure-report
```

### Verify Installation
You can also run the complete test suite to verify everything is working, via shortcuts I placed in the package.json:
```bash
# Build and test in one command
yarn detox:ios
```

You should see your app running in iOS Simulator with tests.

## GitHub Actions CI/CD Pipeline

The `ios-regression.yml` workflow provides automated testing with a multi-stage pipeline:

### Pipeline Stages
1. **Build Stage**: Sets up macOS environment, installs dependencies (Node.js 20, Ruby 3.2, CocoaPods), and builds the iOS app for iPhone 16 Pro simulator
2. **Test Stage**: Boots iPhone 16 Pro simulator running Detox tests collecting artifacts such as screenshots, videos, logs
3. **Allure Report Stage**: Generates HTML test reports, deploying to GitHub Pages at https://tjmaher.github.io/detox-demo/ios/
4. **Cleanup Stage**: Removes temporary files and shuts down simulators

### Key Features
- **Triggered on**: Push to main, pull requests, manual dispatch with test suite selection
- **iPhone 16 Pro Focus**: Uses iPhone 16 Pro simulator
- **Failure Handling**: Each stage only runs if prerequisites succeed, with proper error handling
- **Visual Artifacts**: Captures screenshots and videos using Wix's [detox-allure2-adapter](https://github.com/wix-incubator/detox-allure2-adapter)
- **Live Reports**: Publishes test results to GitHub Pages for easy access


# Getting Started

[Set Up Your React Native Environment](https://reactnative.dev/docs/set-up-your-environment) before proceeding.

## Step 1: Start Metro

Run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run:

```sh
# Using yarn
yarn start

```

## Step 2: Build your app

Open a new terminal from the root of your React Native project.

### iOS

For iOS, install CocoaPods dependencies:

Run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

For more information, visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

### Step 3: Run the Tests

How to run tests:

Run all the tests: 
* detox test --configuration ios.sim.debug

Run only the LoginPage tests in login.test.ts: 
* detox test --configuration ios.sim.debug e2e/login.test.ts

... Or you can run shortcuts to run the tests, found in the package.json file in the root directory:
 
 ```sh
 "detox:build:ios": "detox build --configuration ios.sim.debug",
 "detox:test:ios": "detox test --configuration ios.sim.debug",
 "detox:ios": "yarn run detox:build:ios && yarn run detox:test:ios"
```

To run one of the shortcuts, add the command "yarn" plus the shortcut:
* Run all the tests on an iOS elmulator in debug mode: yarn detox:test:ios

Detox has a REPL mode, a Run - Evaluate - Print Loop where you can investigate your running app. For more information, see [Wix Detox: Debugging with Detox REPL](https://wix.github.io/Detox/docs/guide/detox-repl)

Let's say you wanted to run all failing LoginPage tests in REPL mode:
* detox test --configuration ios.sim.debug e2e/login.test.ts --repl=auto

Some things you can do in REPL Mode:
```
.detox> .help
.break     Sometimes you get stuck, this gets you out
.dumpxml   Print view hierarchy XML
.exit      Exit the REPL
.help      Print this help message
```


You should see your new app running in iOS Simulator.

  Login Flow
  ```
    ✓ Verify Heading and Instruction Text (1550 ms)
    ✓ Invalid credentials displays error message (3958 ms)
    ✓ Successful login to Secure Area displays success message (5159 ms)
    ✓ Logout from Secure Area returns to Login Page (5779 ms)

    Test Suites: 1 passed, 1 total
    Tests:       4 passed, 4 total
    Snapshots:   0 total
    Time:        27.516 s, estimated 39 s
  ```  

# Troubleshooting

If you're having issues see the [Troubleshooting React Native application](https://reactnative.dev/docs/troubleshooting) page.

## Test Reporting with Allure

This project uses [detox-allure2-adapter](https://github.com/wix-incubator/detox-allure2-adapter) to generate visual test reports with screenshots, videos, and logs captured on test failures.

### Key Features
- **HTML Reports**: Rich test execution reports with pass/fail details
- **Visual Artifacts**: Screenshots and videos captured only on failures
- **Device Logs**: iOS simulator logs for debugging
- **CI Integration**: Automatic report generation and deployment

### Configuration
The adapter is configured in `.detoxrc.js` and `e2e/jest.config.js` to capture artifacts on failing tests and generate results in `allure-results/`.

### Viewing Reports

**Local Development:**
```bash
brew install allure
allure generate allure-results --clean -o allure-report
allure open allure-report
```

**CI/CD Pipeline:**
View live reports at https://tjmaher.github.io/detox-demo/ios/

The GitHub Actions workflow automatically runs tests, captures failure artifacts, and publishes reports to GitHub Pages for easy access to test results and debugging

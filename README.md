# Detox Demo - React Native iOS App

DetoxDemo is a React Native application demonstrating Wix's [Detox](https://wix.github.io/Detox/), a grey-box end-to-end automated testing framework built to test React Native applications. 

The automation framework was built by T.J. Maher. Detox demo, the app under test, was mostly constructed by GitHub CoPilot via prompts from T.J. Maher.

DetoxDemo is based on Dave Haefner's [The - Internet / Login](http://the-internet.herokuapp.com/login), a site where T.J. Maher taught himself automation development by writing Selenium + Java tests against it.

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
├── constants.ts              # Time constants (2s, 3s, 5s, etc.)
├── credentials.ts            # Test credentials
├── init.ts                   # Detox initialization
├── jest.config.js           # Jest configuration for Detox
└── login.test.ts            # Main test suite

.detoxrc.js                  # Detox configuration
```

## Setup & Installation

### Prerequisites
- Node.js (>= 20)
- Xcode (for iOS development)
- iOS Simulator
- React Native development environment

### Install Dependencies
```bash
yarn install
```

### iOS Setup
```bash
cd ios && pod install && cd ..
```

# Getting Started

[Set Up Your React Native Environment](https://reactnative.dev/docs/set-up-your-environment) before proceeding.

## Step 1: Start Metro

Run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run:

```sh
# Using yarn
yarn start

```

## Step 2: Build and run your app

Open a new terminal from the root of your React Native project.

### iOS

For iOS, install CocoaPods dependencies:

Run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
yarn ios
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

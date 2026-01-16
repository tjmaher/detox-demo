<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Detox Demo Project Instructions

This is a React Native application with Detox end-to-end testing framework for iOS. The app simulates the login functionality from https://the-internet.herokuapp.com/login.

## Project Structure
- `src/screens/` - React Native screen components
- `e2e/` - Detox test files and configuration
- `e2e/pages/` - Page Object Model files for tests

## Key Features
- Login screen with username/password inputs
- Secure area screen after successful login
- Error/success banner messages
- Proper testID attributes for Detox testing

## Testing Guidelines
- Use Page Object Model pattern for tests
- All page objects extend BasePage class
- Test constants are defined in `e2e/constants.ts`
- Credentials stored in `e2e/credentials.ts`

## Commands
- `yarn detox:build:ios` - Build iOS app for testing
- `yarn detox:test:ios` - Run Detox tests on iOS simulator
- `yarn detox:ios` - Build and test in one command

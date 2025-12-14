import { device } from 'detox';
import loginPage from './pages/login-page';
import secureAreaPage from './pages/secure-area-page';
import { CREDENTIALS } from './credentials';

describe('Login Flow', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  afterAll(async () => {
    await device.terminateApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Verify Heading and Instruction Text', async () => {
    await loginPage.waitToLoad();
    await loginPage.verifyHeading();
    await loginPage.verifyInstructionText();
  });

  it('Invalid credentials displays error message', async () => {
    await loginPage.waitToLoad();
    await loginPage.enterUsername('invaliduser');
    await loginPage.enterPassword('invalidpass');
    await loginPage.tapLoginButton();
    await loginPage.verifyErrorMessage();
  });

  it('Successful login to Secure Area displays success message', async () => {
    await loginPage.waitToLoad();
    await loginPage.enterUsername(CREDENTIALS.USERNAME);
    await loginPage.enterPassword(CREDENTIALS.PASSWORD);
    await loginPage.tapLoginButton();
    
    await secureAreaPage.waitToLoad();
    await secureAreaPage.verifyHeading();
    await secureAreaPage.verifyBodyText();
    await secureAreaPage.verifySuccessBanner();
  });

  it('Logout from Secure Area returns to Login Page', async () => {
    // TODO: Refactor this into a Login helper function
    await loginPage.waitToLoad();
    await loginPage.enterUsername(CREDENTIALS.USERNAME);
    await loginPage.enterPassword(CREDENTIALS.PASSWORD);
    await loginPage.tapLoginButton();
    
    // Wait to Load Secure Area then Log out
    await secureAreaPage.waitToLoad();
    await secureAreaPage.tapLogoutButton();
    
    // Should be back on login page with logout message
    await loginPage.waitToLoad();
    await loginPage.verifyLogoutSuccessMessage();
  });
});

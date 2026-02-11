import { device } from 'detox';
import loginPage from './pages/login-page';
import secureAreaPage from './pages/secure-area-page';
import credentials from './data/credentials.json';
import BasePage from './pages/base-page';

describe('Login Flow: ', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
    await loginPage.waitToLoad();
  });

  afterAll(async () => {
    BasePage.outputAllTestResults();
    await device.terminateApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    BasePage.clearTestLogs();
  });

  afterEach(async () => {
    BasePage.collectTestResult();
  });

  it('Verify Heading and Instruction Text', async () => {
    await loginPage.waitToLoad();
    await loginPage.verifyHeading();
    await loginPage.verifyInstructionText();
  });

  it('Invalid credentials displays error message inside an error banner', async () => {
    await loginPage.loginAs(credentials.invalidUser.userName, credentials.invalidUser.password);
    await loginPage.verifyErrorMessage();
  });

  it('Successful login to Secure Area displays success message', async () => {
    await loginPage.loginAs(credentials.validUser.userName, credentials.validUser.password);
    await secureAreaPage.waitToLoad();
    await secureAreaPage.verifySuccessBanner();
  });
});

import { device } from 'detox';
import loginPage from './pages/login-page';
import secureAreaPage from './pages/secure-area-page';
import { validUser, invalidUser } from './credentials';
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
    await device.reloadReactNative();
    BasePage.collectTestResult();
  });

  it('Verify Heading and Instruction Text', async () => {
    await loginPage.waitToLoad();
    await loginPage.verifyHeading();
    await loginPage.verifyInstructionText();
  });

  it('Invalid credentials displays error message inside an error banner', async () => {
    await loginPage.loginAs(invalidUser.userName, invalidUser.password);
    await loginPage.verifyErrorMessage();
  });

  it('Successful login to Secure Area displays success message', async () => {
    await loginPage.loginAs(validUser.userName, validUser.password);
    await secureAreaPage.waitToLoad();
    await secureAreaPage.verifySuccessBanner();
  });
});

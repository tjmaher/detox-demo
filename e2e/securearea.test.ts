import { device } from 'detox';
import loginPage from './pages/login-page';
import secureAreaPage from './pages/secure-area-page';
import { validUser } from './credentials';
import BasePage from './pages/base-page';

describe('Secure Area Flow', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  afterAll(async () => {
    await device.terminateApp();
    BasePage.outputAllTestResults();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    BasePage.clearTestLogs();
    
    // Login to access secure area
    await loginPage.waitToLoad();
    await loginPage.loginAs(validUser.userName, validUser.password);
    await secureAreaPage.waitToLoad();
  });

  afterEach(async () => {
    BasePage.collectTestResult();
  });

  it('Verify Secure Area Welcome Message', async () => {
    await secureAreaPage.verifyHeading();
    await secureAreaPage.verifyBodyText();
    await secureAreaPage.verifySuccessBanner();
  });

  it('Logging out from Secure Area returns to Login Page displaying Success Message', async () => {
    await secureAreaPage.verifyHeading();
    await secureAreaPage.tapLogoutButton();
    await loginPage.waitToLoad();
    await loginPage.verifyLogoutSuccessMessage();
  });
});
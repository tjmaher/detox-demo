import { device } from 'detox';
import loginPage from './pages/login-page';
import secureAreaPage from './pages/secure-area-page';
import credentials from './data/credentials.json';
import BasePage from './pages/base-page';

describe('Secure Area Flow: ', () => {
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
    
    // Login to access secure area
    await loginPage.waitToLoad();
    await loginPage.loginAs(credentials.validUser.userName, credentials.validUser.password);
    await secureAreaPage.waitToLoad();
  });

  afterEach(async () => {
    await device.reloadReactNative();
    BasePage.collectTestResult();
  });

  it('Verify all Secure Area elements', async () => {
    await secureAreaPage.verifyHeading();
    await secureAreaPage.verifyBodyText();
    await secureAreaPage.verifySuccessBanner();
    await secureAreaPage.verifyLogoutButtonVisible();
  });

  it('Logging out from Secure Area returns to Login Page displaying Success Message', async () => {
    await secureAreaPage.verifyHeading();
    await secureAreaPage.tapLogoutButton();
    await loginPage.waitToLoad();
    await loginPage.verifyLogoutSuccessMessage();
  });
});
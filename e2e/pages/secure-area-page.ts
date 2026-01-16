import { element, by, waitFor } from 'detox';
import BasePage from './base-page';
import { TEN_SECONDS } from '../constants';

class SecureAreaPage extends BasePage {
  private readonly heading = by.id('secure-area-heading');
  private readonly bodyText = by.id('secure-area-body');
  private readonly logoutButton = by.id('logout-button');
  private readonly successBanner = by.id('success-banner');
  private readonly successTextElement = by.id('success-text');

  private static readonly headingText = 'Secure Area';
  private static readonly successLoginText = 'You logged into a secure area!';
  private static readonly secureAreaInstructionText = 'Welcome to the Secure Area. When you are done click logout below.';

  async waitToLoad() {
    this.log('SecureAreaPage: Verifying Page is Loaded');
    await waitFor(element(this.heading)).toBeVisible().withTimeout(TEN_SECONDS);
  }

  async verifyHeading() {
    this.log(` * Verifying Heading: '${SecureAreaPage.headingText}'`);
    await this.verifyElementHasText(this.heading, SecureAreaPage.headingText);
  }

  async verifyElements() {
    await this.verifyHeading();
    await this.verifyBodyText();
    await this.verifySuccessBanner();
    await this.verifyLogoutButtonVisible();
  }

  async verifyBodyText() {
    this.log(` * Verifying Body Text`);
    this.log(` * Expected Text: ${SecureAreaPage.secureAreaInstructionText}`);
    await this.verifyElementHasText(this.bodyText, SecureAreaPage.secureAreaInstructionText);
  }

  async verifySuccessBanner() {
    this.log(` * Verifying Success Banner`);
    this.log(` * Expected Text: ${SecureAreaPage.successLoginText}`);
    await this.expectElementToBeVisible(this.successBanner);
    await this.verifyElementHasText(this.successTextElement, SecureAreaPage.successLoginText);
  }

  async verifyLogoutButtonVisible() {
    this.log(` * Verifying Logout Button is Visible`);
    await this.expectElementToBeVisible(this.logoutButton);
  }

  async tapLogoutButton() {
    this.log(` * Tapping Logout Button`);
    await element(this.logoutButton).tap();
  }
}

export default new SecureAreaPage();

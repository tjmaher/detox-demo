import { expect, element, by } from 'detox';
import BasePage from './base-page';
import { TEN_SECONDS } from '../constants';

class SecureAreaPage extends BasePage {
  private readonly heading = element(by.id('secure-area-heading'));
  private readonly bodyText = element(by.id('secure-area-body'));
  private readonly logoutButton = element(by.id('logout-button'));
  private readonly successBanner = element(by.id('success-banner'));

  async waitToLoad() {
    await waitFor(this.heading).toBeVisible().withTimeout(TEN_SECONDS);
  }

  async verifyHeading() {
    await expect(this.heading).toBeVisible();
  }

  async verifyBodyText(): Promise<void> {
    const expectedText = 'Welcome to the Secure Area. When you are done click logout below.';
    await this.expectTextToBeVisible(expectedText);
  }

  async verifySuccessBanner(): Promise<void> {
    await this.expectTextToBeVisible('You logged into a secure area!');
  }

  async tapLogoutButton(): Promise<void> {
    await this.logoutButton.tap();
  }

  async getSuccessBannerText(){
    return await this.getTextFromElement(this.successBanner);
  }
}

export default new SecureAreaPage();

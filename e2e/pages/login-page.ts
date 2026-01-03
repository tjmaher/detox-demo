import { expect, element, by } from 'detox';
import BasePage from './base-page';
import { TEN_SECONDS } from '../constants';

class LoginPage extends BasePage {
  private readonly heading = element(by.id('login-heading'));
  private readonly instructionText = element(by.id('login-instructions'));
  private readonly usernameInput = element(by.id('username-input'));
  private readonly passwordInput = element(by.id('password-input'));
  private readonly loginButton = element(by.id('login-button'));
  private readonly errorBanner = element(by.id('error-banner'));
  private readonly successBanner = element(by.id('success-banner'));

  private readonly infoText = element(by.text('This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages'));

  async waitToLoad() {
    await waitFor(this.heading).toBeVisible().withTimeout(TEN_SECONDS);
  }

  async verifyHeading() {
    await expect(this.heading).toBeVisible();
  }

  async verifyInstructionText() {
    await expect(this.instructionText).toBeVisible();
    await expect(this.infoText).toBeVisible();
  }

  async enterUsername(username: string) {
    await this.usernameInput.replaceText(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.replaceText(password);
  }

  async tapLoginButton(){
    await this.loginButton.tap();
  }

  async verifyErrorMessage(): Promise<void> {
    await this.expectTextToBeVisible('Your username is invalid!');
  }

  async verifyLogoutSuccessMessage(): Promise<void> {
    await this.expectTextToBeVisible('You logged out of the secure area!');
  }

  async getErrorBannerText() {
    return await this.getTextFromElement(this.errorBanner);
  }

  async getSuccessBannerText(){
    return await this.getTextFromElement(this.successBanner);
  }
}

export default new LoginPage();

import { expect, element, by, waitFor } from 'detox';
import BasePage from './base-page';
import { TEN_SECONDS } from '../constants';
import messages from '../data/messages.json';

class LoginPage extends BasePage {
  private readonly heading = by.text('Login Page');
  private readonly instructionText = by.id('login-instructions');
  private readonly usernameInput = by.id('username-input');
  private readonly passwordInput = by.id('password-input');
  private readonly loginButton = by.id('login-button');
  private readonly errorBanner = by.id('error-banner');
  private readonly errorTextElement = by.id('error-text');
  private readonly successLogoutTextElement = by.id('success-logout-text');
  private readonly successBanner = by.id('success-banner');

  private static readonly headingText = messages.loginPage.heading;
  private static readonly infoText = messages.loginPage.bodyText;
  private static readonly errorText = messages.loginPage.invalidUsernameMessagePrefix;
  private static readonly logoutSuccessText = messages.loginPage.logoutSuccessMessage;

  async waitToLoad() {
    this.log('\nLoginPage: Verifying Page is Loaded');
    await waitFor(element(this.heading)).toBeVisible().withTimeout(TEN_SECONDS);
  }

  async verifyHeading() {
    this.log(` * Verifying Heading: '${LoginPage.headingText}'`);
    await this.verifyElementHasText(this.heading, LoginPage.headingText);
  }

  async verifyInstructionText() {
    this.log(' * Verifying Instruction Text is visible');
    await expect(element(this.instructionText)).toBeVisible();
    this.log(` * Expected Text: ${LoginPage.infoText}`);
    await this.verifyElementHasText(this.instructionText, LoginPage.infoText);
  }

  async enterUsername(username: string) {
    this.log(` * Entering Username: ${username}`);
    await element(this.usernameInput).replaceText(username);
    await this.dismissKeyboard(this.usernameInput);
  }

  async enterPassword(password: string) {
    this.log(` * Entering Password: ${password}`);
    await element(this.passwordInput).replaceText(password);
    await this.dismissKeyboard(this.passwordInput);
  }

  async tapLoginButton(){
    this.log(' * Tapping Login Button');
    await element(this.loginButton).tap();
  }

  async verifyErrorMessage() {
    this.log(' * Verifying Error Message:');
    this.log(` * Expected Text: ${LoginPage.errorText}`);
    await this.verifyElementHasText(this.errorTextElement, LoginPage.errorText);
  }

  async verifyLogoutSuccessMessage() {
    this.log('\nLoginPage: Verifying Logout Success Message:');
    this.log(` * Expected Text: ${LoginPage.logoutSuccessText}`);
    await this.expectElementToBeVisible(this.successBanner);
    await this.verifyElementHasText(this.successLogoutTextElement, LoginPage.logoutSuccessText);
  }

  async loginAs(username: string, password: string) {
    this.log(`\nLoginPage: Logging in as ${username} / ${password}`);
    await this.waitToLoad();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.tapLoginButton();
  }
}

export default new LoginPage();

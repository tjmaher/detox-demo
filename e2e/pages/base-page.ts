import { expect, element, by, waitFor } from 'detox';
import { THREE_SECONDS } from '../constants';

export default abstract class BasePage {
  
  async scrollToBottom() {
    await element(by.type('UIScrollView')).atIndex(0).scrollTo('bottom');
  }

  async getVisibleText(text: string) {
    const textElement = element(by.text(text)).atIndex(0);
    await waitFor(textElement).toBeVisible().withTimeout(THREE_SECONDS);
    return textElement;
  }

  async expectTextToBeVisible(text: string) {
    await expect(element(by.text(text))).toBeVisible();
  }

  async expectTextNotToBeVisible(text: string) {
    await expect(element(by.text(text))).not.toBeVisible();
  }

  async getTextFromElement(elementMatcher: any){
    const attributes = await elementMatcher.getAttributes();
    return attributes.text;
  }
}

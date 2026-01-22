import { expect, element, by, waitFor } from 'detox';
import { expect as jestExpect } from '@jest/globals';
import { FIVE_SECONDS } from '../constants';

export default abstract class BasePage {
  protected static testLogs: string[] = [];
  protected static allTestResults: Array<{testName: string, status: 'PASS' | 'FAIL', error?: string, logs: string[]}> = [];
  
  protected log(message: string) {
    BasePage.testLogs.push(message);
  }

  static getTestLogs(): string[] {
    return BasePage.testLogs;
  }

  static clearTestLogs() {
    BasePage.testLogs = [];
  }

  static collectTestResult(testResult?: { success: boolean; error?: string }) {
    const currentTest = jestExpect.getState();
    const testName = currentTest.currentTestName || 'Unknown Test';
    
    let formattedTestName = testName;
    
    // If Jest provides the full path with separator, use it
    //   Jest often provides "DescribeBlock › itBlock" format
    if (currentTest.testPath) {
      formattedTestName = testName.replace(' › ', ': ');
    }
    
    // Use Jest's test result if available, otherwise default to PASS
    let testStatus: 'PASS' | 'FAIL' = 'PASS';
    let errorMessage: string | undefined;
    
    if (testResult) {
      testStatus = testResult.success ? 'PASS' : 'FAIL';
      errorMessage = testResult.error;
    }
    
    BasePage.allTestResults.push({
      testName: formattedTestName,
      status: testStatus,
      error: errorMessage,
      logs: [...BasePage.testLogs]
    });
    
    BasePage.clearTestLogs();
  }

  static outputAllTestResults() {
    BasePage.allTestResults.forEach(result => {
      let output = `\n==${result.testName}==\n`;
      output += result.logs.map(log => ` ${log}`).join('\n');
      
      // Only show error information if test failed
      if (result.error && result.status === 'FAIL') {
        output += `\nError: ${result.error}\n`;
      }
      
      output += `\n ================================\n`;
      
      console.log(output);
    });

    // Clear all results after output
    BasePage.allTestResults = [];
  }

  async scrollToBottom() {
    await element(by.type('UIScrollView')).atIndex(0).scrollTo('bottom');
  }

  async getVisibleText(text: string) {
    const textElement = element(by.text(text)).atIndex(0);
    await waitFor(textElement).toBeVisible().withTimeout(FIVE_SECONDS);
    return textElement;
  }

  protected async dismissKeyboard(inputSelector: Detox.NativeMatcher) {
    if (device.getPlatform() === 'ios') {
      try {
        await element(inputSelector).tapReturnKey();
      } catch (error) {
        this.log(` * Keyboard already dismissed or return key not available: ${error}`);
      }
    }
  }

  async expectElementToBeVisible(locator: any) {
    await expect(element(locator)).toBeVisible();
  }

 async verifyElementHasText(locator: Detox.NativeMatcher, expectedText: string) {
    await waitFor(element(locator)).toBeVisible().withTimeout(FIVE_SECONDS);
    await expect(element(locator)).toHaveText(expectedText);
  }

  async verifyElementContainsText(locator: Detox.NativeMatcher, expectedText: string) {
    const textElement = element(by.text(expectedText).withAncestor(locator));
    await waitFor(textElement).toBeVisible().withTimeout(FIVE_SECONDS);
  }

  async expectTextToBeVisible(text: string) {
    await expect(element(by.text(text))).toBeVisible();
  }

  async expectTextNotToBeVisible(text: string) {
    await expect(element(by.text(text))).not.toBeVisible();
  }
}

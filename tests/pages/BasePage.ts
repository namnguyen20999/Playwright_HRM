import {Page} from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the specified URL.
   * @param url - The URL to navigate to.
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Waits for a specific amount of time.
   * @param ms - The time to wait in milliseconds.
   * */
  async wait(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Performs enter key action.
   * */
  async pressEnter(): Promise<void> {
    await this.page.keyboard.press('Enter');
  }
}


import {BasePage} from "./BasePage";
import {Locator, Page} from "@playwright/test";

export class DashboardPage extends BasePage {
  // Selector for the dashboard header element
  readonly header: Locator

  constructor(page: Page) {
    super(page);
    this.header = page.locator('h6', { hasText: 'Dashboard' });
  }
}
import {Page} from "@playwright/test";

export class SidePanel {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Dynamically clicks a menu item by its visible text.
   * @param itemName The visible text of the menu item to click.
   */
  async navigateTo(itemName: string): Promise<void> {
    const menuItem = this.page.locator('a.oxd-main-menu-item', {hasText: itemName});
    await menuItem.click();
  }
}
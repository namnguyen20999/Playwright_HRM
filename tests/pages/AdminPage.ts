import {BasePage} from "./BasePage";
import {Locator, Page} from "@playwright/test";

interface AdminSearchCriteria {
  username?: string;
  userRole?: string;
  status?: string;
  employeeName?: string;
}

export class AdminPage extends BasePage {
  readonly usernameInput: Locator;
  readonly userRoleDropdown: Locator;
  readonly userRoleOption: (role: string) => Locator;
  readonly searchButton: Locator;
  readonly employeeNameInput: Locator;
  readonly statusDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input.oxd-input.oxd-input--active').nth(1);
    this.userRoleDropdown = page.locator('div.oxd-select-wrapper').locator('div.oxd-select-text.oxd-select-text--active').nth(0);
    this.statusDropdown = page.locator('div.oxd-select-wrapper').locator('div.oxd-select-text.oxd-select-text--active').nth(1);
    this.userRoleOption = (role: string) => page.locator('.oxd-select-dropdown .oxd-select-option', {hasText: role});
    this.searchButton = page.locator('button', {hasText: 'Search'});
    this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]');
  }


  async searchUser(criteria: AdminSearchCriteria): Promise<void> {
    if (criteria.username) {
      await this.fillUsername(criteria.username);
    }

    if (criteria.userRole) {
      await this.selectUserRole(criteria.userRole);
    }

    if (criteria.status) {
      await this.selectStatus(criteria.status);
    }

    if (criteria.employeeName) {
      await this.fillEmployeeName(criteria.employeeName);
    }

    await this.clickSearchButton();
  }

  /**
   * Selects a user role from the dropdown.
   * @param role The user role to select (e.g. "Admin", "ESS").
   */
  async selectUserRole(role: string): Promise<void> {
    await this.userRoleDropdown.click();
    await this.userRoleOption(role).click();
  }

  /**
   * Select a status from the dropdown.
   * @param status The status to select (e.g. "Enabled", "Disabled").
   */
  async selectStatus(status: string): Promise<void> {
    await this.statusDropdown.click();
    await this.userRoleOption(status).click();
  }

  /**
   * Fills in the username field.
   * @param username The username to fill in.
   */
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Fills in the employee name field.
   * @param employeeName The employee name to fill in.
   */
  async fillEmployeeName(employeeName: string): Promise<void> {
    await this.employeeNameInput.fill(employeeName);
  }

  /**
   * Clicks the search button (if required).
   */
  async clickSearchButton(): Promise<void> {
    // Replace with actual logic for triggering the search
    await this.searchButton.click();
  }
}
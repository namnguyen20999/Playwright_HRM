import {BasePage} from "./BasePage";
import {Locator, Page} from "@playwright/test";

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorAlert: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorAlert = page.getByRole('alert');
    this.errorMessage = page.locator('span', { hasText: 'Required' });
  }

  /**
   * Goes to the login page.
   * */
  async goToLoginPage(): Promise<void> {
    await this.goto(`${process.env.BASE_URL}/web/index.php/auth/login`);
  }

  /**
   * Fills in the username field.
   *
   * @param username - The username to fill in.
   * */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Fills in the password field.
   *
   * @param password - The password to fill in.
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Clicks the login button.
   */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Logs in with the provided username and password.
   *
   * @param username - The username to log in with.
   * @param password - The password to log in with.
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}
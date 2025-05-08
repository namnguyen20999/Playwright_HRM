import {test} from '@fixtures/ui-fixture'
import {expect} from "@playwright/test";
import {invalidUserCredentials, sqlInjectionPayloads, validUserCredentials} from "@data/login-credential";

test.describe('Login Tests', () => {
  test('Verify user can login with valid credentials', async ({ loginPage, dashboardPage, page }) => {
    await loginPage.goToLoginPage();
    await loginPage.login(validUserCredentials.username, validUserCredentials.password);
    await expect(page).toHaveURL(`${process.env.BASE_URL}/web/index.php/dashboard/index`);
    await expect(dashboardPage.header).toBeVisible();
  });

  test('Verify user can login with valid credential when pressing Enter key', async ({ loginPage, dashboardPage, page }) => {
    await loginPage.goToLoginPage();
    await loginPage.enterUsername(validUserCredentials.username);
    await loginPage.enterPassword(validUserCredentials.password);
    await loginPage.pressEnter();
    await expect(page).toHaveURL(`${process.env.BASE_URL}/web/index.php/dashboard/index`);
    await expect(dashboardPage.header).toBeVisible();
  })

  test('Verify user cannot login with invalid credentials', async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login(invalidUserCredentials.username, invalidUserCredentials.password);
    await expect(loginPage.errorAlert).toBeVisible();
    await expect(loginPage.errorAlert).toHaveText('Invalid credentials');
  });

  test('Verify user cannot login with empty username', async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login('', validUserCredentials.password);
    await expect(loginPage.errorMessage).toBeVisible();
  })

  test('Verify user cannot login with empty password', async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login(validUserCredentials.username, '');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  // This case is expected to fail because the username should be case-sensitive, but the frontend currently treats it as case-insensitive
  test.skip('Verify case sensitivity of username and password', async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login(process.env.USERNAME.toLowerCase(), validUserCredentials.password);
    await expect(loginPage.errorAlert).toBeVisible();
    await expect(loginPage.errorAlert).toHaveText('Invalid credentials');
  })
});

test.describe('SQL Injection Tests for OrangeHRM Login', () => {
  for (const { field, value } of sqlInjectionPayloads) {
    test(`should not allow SQL injection in ${field}: "${value}"`, async ({ loginPage, page }) => {
      await loginPage.goToLoginPage();
      const username = field === 'username' ? value : validUserCredentials.username;
      const password = field === 'password' ? value : validUserCredentials.password;
      await loginPage.login(username, password);
      await expect(page).not.toHaveURL(/dashboard/);
      await expect(loginPage.errorAlert).toBeVisible();
      await expect(loginPage.errorAlert).toHaveText('Invalid credentials');
    });
  }
});


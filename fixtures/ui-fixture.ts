import {Browser, BrowserContext, chromium, firefox, test as base, webkit} from '@playwright/test';
import {LoginPage} from "../tests/pages/LoginPage";
import {DashboardPage} from "../tests/pages/DashboardPage";
import {SidePanel} from "../tests/base_UI/Components/SidePanel";
import {validUserCredentials} from "@data/login-credential";
import {AdminPage} from "../tests/pages/AdminPage";
import {RecordTable} from "../tests/base_UI/Components/RecordTable";

type MyFixtures = {
  browser: Browser;
  context: BrowserContext;
  adminPage: AdminPage;
  dashboardPage: DashboardPage;
  loginPage: LoginPage;
  recordTable: RecordTable;
  sidePanel: SidePanel;
  login: () => Promise<void>;
}

export const test = base.extend<MyFixtures>({
  browser: async ({}, use, testInfo) => {
    const browserType = testInfo.project.name === 'firefox' ? firefox :
      testInfo.project.use.browserName === 'webkit' ? webkit : chromium;

    const browser = await browserType.launch();
    await use(browser);
    await browser.close();
  },

  context: async ({browser}, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },

  adminPage: async ({page}, use) => {
    const adminPage = new AdminPage(page);
    await use(adminPage);
  },

  dashboardPage: async ({page}, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  loginPage: async ({page}, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  recordTable: async ({page}, use) => {
    const recordTable = new RecordTable(page);
    await use(recordTable);
  },

  sidePanel: async ({page}, use) => {
    const sidePanel = new SidePanel(page);
    await use(sidePanel);
  },

  login: async ({loginPage}, use) => {
    await use(async () => {
      await loginPage.goToLoginPage()
      await loginPage.login(validUserCredentials.username, validUserCredentials.password)
    })
  }
})

export {expect} from '@playwright/test';
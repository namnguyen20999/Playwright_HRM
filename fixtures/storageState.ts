import {chromium, test as base} from '@playwright/test';
import * as fs from 'fs/promises';
import * as path from 'path';

const STORAGE_PATH = path.resolve(__dirname, '../utils/auth/storageState.json');
const BASE_URL = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com';

type AuthFixtures = {
  storageStatePath: string;
};

export const test = base.extend<AuthFixtures>({
  storageStatePath: async ({}, use) => {
    try {
      await fs.access(STORAGE_PATH);
    } catch {
      const browser = await chromium.launch();
      const page = await browser.newPage();

      await page.goto(BASE_URL);
      await page.fill('input[name="username"]', 'Admin');
      await page.fill('input[name="password"]', 'admin123');
      await page.click('button[type="submit"]');
      await fs.mkdir(path.dirname(STORAGE_PATH), {recursive: true});
      await page.context().storageState({path: STORAGE_PATH});
      await browser.close();
    }

    await use(STORAGE_PATH);
  }
});

export {expect} from '@playwright/test';
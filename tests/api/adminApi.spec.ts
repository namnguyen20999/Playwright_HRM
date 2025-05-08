import {expect, test} from '@fixtures/storageState';
import {request} from '@playwright/test';
import {UserRecord} from "@api/models/user";

test.describe('Admin API Tests', () => {
  test('should return matching users when filtering by username, role, and status', async ({storageStatePath}) => {
    const apiContext = await request.newContext({
      baseURL: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
      storageState: storageStatePath,
    });

    const response = await apiContext.get('/web/index.php/api/v2/admin/users', {
      params: {
        username: 'Admin',
        userRoleId: '1',
        status: '1',
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.meta.total).toBeGreaterThan(0);
    await apiContext.dispose();
  });

  test('should return enabled users only', async ({storageStatePath}) => {
    const apiContext = await request.newContext({
      baseURL: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
      storageState: storageStatePath,
    });

    const response = await apiContext.get('/web/index.php/api/v2/admin/users', {
      params: {
        username: 'Admin',
        userRoleId: '1',
        status: '1',
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    body.data.forEach((user: UserRecord) => {
      expect(user.status).toBe(true);
    });

    await apiContext.dispose();
  });
});
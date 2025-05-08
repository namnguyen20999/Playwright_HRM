import {test} from '@fixtures/ui-fixture';
import {expect} from '@playwright/test';
import {adminRecords} from '@data/admin-records';

test.describe('Admin Tests', () => {
  test.beforeEach(async ({login}) => {
    await login();
  })

  test('Verify search functionality in Admin page', async ({sidePanel, adminPage, recordTable}) => {
    await sidePanel.navigateTo("Admin");
    await adminPage.searchUser({
      username: 'Admin',
      userRole: 'Admin',
      status: 'Enabled',
    });
    expect(recordTable.isRecordPresent(adminRecords)).toBeTruthy();
  })

  test('Verify username filter in Admin page', async ({sidePanel, adminPage, recordTable}) => {
    await sidePanel.navigateTo("Admin");
    await adminPage.searchUser({
      username: 'Admin',
    })
    expect(recordTable.isRecordPresent(adminRecords)).toBeTruthy();
  })

  test('Verify user role filter in Admin page', async ({sidePanel, adminPage, recordTable}) => {
    await sidePanel.navigateTo("Admin");
    await adminPage.searchUser({
      userRole: 'Admin',
    })
    const roles = await recordTable.getColumnValues(3);
    for (const role of roles){
      expect(role).toBe('Admin');
    }
  })

  test('Verify status filter in Admin page', async ({sidePanel, adminPage, recordTable}) => {
    await sidePanel.navigateTo("Admin");
    await adminPage.searchUser({
      status: 'Enabled',
    })
    const statuses = await recordTable.getColumnValues(4);
    for (const status of statuses){
      expect(status).toBe('Enabled');
    }
  })

  test('Verify no record found message when searching for non-existent user', async ({sidePanel, adminPage, recordTable}) => {
    await sidePanel.navigateTo("Admin");
    await adminPage.searchUser({
      username: 'NonExistentUser',
    })
    await expect(recordTable.toast).toHaveText(/No Records Found/i)
  })
});
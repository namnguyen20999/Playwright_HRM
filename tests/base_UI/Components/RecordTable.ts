import {Locator, Page} from "@playwright/test";

export class RecordTable {
  protected readonly page: Page;
  readonly rows: Locator;
  readonly toast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rows = page.locator('div.oxd-table-card');
    this.toast = page.locator('div.oxd-toast p.oxd-text--toast-message');
  }

  /**
   * Verifies if the specified records are present in the table.
   * @param records - An array of records to check for. Each record is an object where the keys are the column names and the values are the expected values.
   * @returns {Promise<boolean>} - Returns true if all records are found in the table, otherwise false.
   * */
  async isRecordPresent(records: Array<Record<string, string | undefined>>): Promise<boolean> {
    const rowCount = await this.rows.count();

    for (const record of records) {
      const valuesToMatch = Object.values(record).filter((v): v is string => Boolean(v));
      let matchFound = false;

      for (let i = 0; i < rowCount; i++) {
        const row = this.rows.nth(i);
        const cellTexts = await row.locator('div.oxd-table-cell').allTextContents();

        if (valuesToMatch.every(value => cellTexts.some(text => text.includes(value)))) {
          matchFound = true;
          break;
        }
      }

      if (!matchFound) {
        return false;
      }
    }

    return true;
  }

  /**
   * Get all cell values for a specific column.
   * @param columnIndex Zero-based column index - eg: 0 for the first column which is the checkbox column.
   * @returns {Promise<string[]>} - Returns an array of cell values for the specified column.
   */
  async getColumnValues(columnIndex: number): Promise<string[]> {
    const count = await this.rows.count();
    const values: string[] = [];

    for (let i = 0; i < count; i++) {
      const row = this.rows.nth(i);
      const cell = row.locator('div.oxd-table-cell').nth(columnIndex);
      const text = await cell.textContent();
      values.push(text?.trim() || '');
    }

    return values;
  }
}
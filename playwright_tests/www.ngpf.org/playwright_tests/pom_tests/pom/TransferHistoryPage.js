import { BasePage } from './BasePage.js';

export class TransferHistoryPage extends BasePage {
  /**
   * TransferHistoryPage models the UI for the transfer history view (upcoming/past transfers).
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Upcoming Transfers label/section, table
    // Use visible section header, robust to language change
    this.upcomingTransfersHeader = this.page.getByText('Upcoming Transfers');
    // Table row count: index 0 for upcoming, 1 for past
    this.upcomingZeroOfZeroLabel = this.page.getByText('0 of 0').nth(0);
    // Past Transfers label/section, table
    this.pastTransfersHeader = this.page.getByText('Past Transfers');
    this.pastZeroOfZeroLabel = this.page.getByText('0 of 0').nth(1);
    // Snackbar confirmation
    // Common Material snackbar: page.locator('simple-snack-bar'), page.getByRole('status'), etc.
    this.snackBar = this.page.locator('simple-snack-bar, [role="status"]');
    // Past Transfers table: row and cell locators
    this.pastTransfersTable = this.page.locator('table').filter({ hasText: 'Past Transfers' });
    // More robust: table rows under Past Transfers section
    this.pastTransfersRows = this.page.locator('section').filter({ hasText: 'Past Transfers' }).locator('tbody tr');
  }

  /**
   * Wait for transfer tables to be visible (column headers present)
   * @returns {Promise<this>}
   */
  async waitForTablesVisible() {
    await this.upcomingTransfersHeader.waitFor({ timeout: 30000 });
    await this.pastTransfersHeader.waitFor({ timeout: 30000 });
    return this;
  }

  /**
   * Validate that both transfer tables are empty ('0 of 0' records).
   * @returns {Promise<boolean>} True if both empty, else false
   */
  async isEmptyStateDisplayed() {
    const upcomingVisible = await this.upcomingZeroOfZeroLabel.isVisible({ timeout: 15000 });
    const pastVisible = await this.pastZeroOfZeroLabel.isVisible({ timeout: 15000 });
    return upcomingVisible && pastVisible;
  }

  /**
   * Waits for and returns the snackbar text message after transfer submission.
   * @returns {Promise<string>}
   */
  async getSnackbarConfirmation(timeout = 30000) {
    await this.snackBar.waitFor({ timeout });
    return this.snackBar.textContent();
  }

  /**
   * Checks for a transfer row in the Past Transfers table matching by description and amount.
   * @param {object} opts
   * @param {string} opts.description - e.g., 'Transfer to Saving Account'
   * @param {string} opts.amount - e.g., '-$50.00'
   * @param {string} [opts.date] - e.g., '03/22/2026', optional
   * @returns {Promise<boolean>}
   */
  async isTransferInPastTransfers({ description, amount, date }) {
    await this.pastTransfersHeader.waitFor({ timeout: 20000 });
    // Find all rows in Past Transfers
    const rows = await this.pastTransfersRows.all();
    for (const row of rows) {
      const rowText = await row.textContent();
      if (
        rowText.includes(description) &&
        rowText.includes(amount) &&
        (!date || rowText.includes(date))
      ) {
        return true;
      }
    }
    return false;
  }
}

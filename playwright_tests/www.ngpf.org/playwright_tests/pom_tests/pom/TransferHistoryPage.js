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
}

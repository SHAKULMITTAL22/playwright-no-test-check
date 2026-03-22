import { BasePage } from './BasePage.js';

export class TransferHistoryPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Limit all selectors to the first table (Upcoming Transfers)
    this.firstTable = this.page.locator('table').first();
    this.headerId = this.firstTable.getByRole('columnheader', { name: 'Id' });
    this.headerDate = this.firstTable.getByRole('columnheader', { name: 'Date' });
    this.headerDescription = this.firstTable.getByRole('columnheader', { name: 'Description' });
    this.headerAmount = this.firstTable.getByRole('columnheader', { name: 'Amount' });
    this.headerActions = this.firstTable.getByRole('columnheader', { name: 'Actions' });
    // Target only the paginator for the first (upcoming) table
    this.noRecordsCell = this.page.locator('.mat-paginator-range-label').first();
  }

  /**
   * Returns locator for all expected table headers for transfer table.
   * (Intended for test code assertions only; does not assert itself.)
   */
  getTableHeaders() {
    return [this.headerId, this.headerDate, this.headerDescription, this.headerAmount, this.headerActions];
  }

  /**
   * Returns locator for 'no records' cell (table shows '0 of 0').
   */
  getNoRecordsCell() {
    return this.noRecordsCell;
  }
}

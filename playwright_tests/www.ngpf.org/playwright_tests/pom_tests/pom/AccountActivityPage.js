import { BasePage } from './BasePage.js';

export class AccountActivityPage extends BasePage {
  /**
   * AccountActivityPage handles account activity verification including transaction history
   * and deposit record confirmation.
   * All selectors are defined as class properties and are private to this Page Object.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    
    // ACCOUNTS navigation link with expand_more
    // 1. page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' })
    // 2. page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' })
    // 3. page.locator('a.mat-list-item.mat-focus-indicator')
    // 4. page.getByText('ACCOUNTS expand_more')
    // 5. page.locator('app-menu-list-item').filter({ hasText: 'ACCOUNTS' })
    this.accountsLink = page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' });
    
    // Account activity table (first table on page)
    // 1. page.locator('table').first()
    // 2. page.locator('mat-table')
    // 3. page.locator('.mat-table')
    // 4. page.locator('table.mat-table')
    // 5. page.locator('[role="table"]')
    this.activityTable = page.locator('table').first();
    
    // Transaction rows in the table
    // 1. page.locator('table tr')
    // 2. page.locator('mat-row')
    // 3. page.locator('table tbody tr')
    // 4. page.locator('.mat-row')
    // 5. page.locator('table').first().locator('tr')
    this.transactionRows = page.locator('table tr');
    
    // Table cells for transaction details
    // 1. page.locator('table td')
    // 2. page.locator('mat-cell')
    // 3. page.locator('table').first().locator('td')
    // 4. page.locator('.mat-cell')
    // 5. page.locator('table tbody td')
    this.tableCells = page.locator('table td');
  }

  /**
   * Navigates to the accounts section from sidebar.
   * @returns {Promise<this>}
   */
  async navigateToAccounts() {
    await this.accountsLink.click({ timeout: 45000 });
    return this;
  }

  /**
   * Verifies that the deposit record appears in the account activity table.
   * This method waits for the table to be visible and returns the page object for further verification.
   * @returns {Promise<this>}
   */
  async verifyDepositRecord() {
    await this.activityTable.waitFor({ state: 'visible', timeout: 60000 });
    return this;
  }

  /**
   * Gets all transaction rows from the activity table for verification.
   * @returns {Promise<import('playwright').Locator>}
   */
  async getTransactionRows() {
    await this.transactionRows.first().waitFor({ state: 'visible', timeout: 45000 });
    return this.transactionRows;
  }

  /**
   * Gets all table cells for detailed transaction verification.
   * @returns {Promise<import('playwright').Locator>}
   */
  async getTableCells() {
    await this.tableCells.first().waitFor({ state: 'visible', timeout: 45000 });
    return this.tableCells;
  }

  /**
   * Waits for the account activity page to fully load.
   * @returns {Promise<this>}
   */
  async waitForPageLoad() {
    await this.activityTable.waitFor({ state: 'visible', timeout: 60000 });
    await this.page.waitForLoadState('networkidle', { timeout: 45000 });
    return this;
  }
}
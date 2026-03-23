import { BasePage } from './BasePage.js';

export class AccountActivityPage extends BasePage {
  /**
   * AccountActivityPage models the Account Activity view at /bank-sim/account.
   * Displays a table of all account transactions including deposits, withdrawals, and transfers.
   * All selectors are defined as private class properties.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);

    // Page-level container for account activity table
    // 1. page.locator('app-account')
    // 2. page.locator('mat-card')
    // 3. page.locator('.account-activity')
    // 4. page.locator('table')
    // 5. page.locator('mat-table')
    this.activityTable = page.locator('app-account');

    // Success toast notification after deposit
    // 1. page.getByText('You have successfully deposited your check.')
    // 2. page.locator('.mat-snack-bar-container')
    // 3. page.locator('[class*="snack-bar"]')
    // 4. page.locator('simple-snack-bar')
    // 5. page.locator('.mat-simple-snackbar')
    this.successToast = page.getByText('You have successfully deposited your check.');

    // Deposit Check transaction row description
    // 1. page.getByText('Deposit Check To Checking Account')
    // 2. page.locator('td').filter({ hasText: 'Deposit Check To Checking Account' })
    // 3. page.locator('mat-cell').filter({ hasText: 'Deposit Check To Checking Account' })
    // 4. page.locator('[class*="cell"]').filter({ hasText: 'Deposit Check To Checking Account' })
    // 5. page.locator('tr').filter({ hasText: 'Deposit Check To Checking Account' })
    this.depositCheckDescription = page.getByText('Deposit Check To Checking Account');

    // Deposit amount cell — $100.00
    // 1. page.getByText('$100.00').first()
    // 2. page.locator('td').filter({ hasText: '$100.00' }).first()
    // 3. page.locator('mat-cell').filter({ hasText: '$100.00' }).first()
    // 4. page.locator('[class*="amount"]').filter({ hasText: '$100.00' })
    // 5. page.locator('tr').filter({ hasText: 'Deposit Check To Checking Account' }).getByText('$100.00')
    this.depositAmount = page.getByText('$100.00').first();

    // Updated balance cell — $316.04
    // 1. page.getByText('$316.04')
    // 2. page.locator('td').filter({ hasText: '$316.04' })
    // 3. page.locator('mat-cell').filter({ hasText: '$316.04' })
    // 4. page.locator('[class*="balance"]').filter({ hasText: '$316.04' })
    // 5. page.locator('tr').filter({ hasText: 'Deposit Check To Checking Account' }).getByText('$316.04')
    this.updatedBalance = page.getByText('$316.04');
  }

  /**
   * Waits for the Account Activity page URL to be confirmed after redirect.
   * @returns {Promise<this>}
   */
  async waitForPage() {
    await this.page.waitForURL('**/account', { timeout: 60000 });
    return this;
  }

  /**
   * Returns the text content of the success toast notification.
   * Should be called immediately after deposit submission before the toast disappears.
   * @returns {Promise<string|null>}
   */
  async getSuccessToastText() {
    await this.successToast.waitFor({ timeout: 15000 });
    return this.successToast.textContent();
  }

  /**
   * Returns whether the deposit check description row is visible in Account Activity.
   * @returns {Promise<boolean>}
   */
  async isDepositCheckDescriptionVisible() {
    await this.depositCheckDescription.waitFor({ timeout: 30000 });
    return this.depositCheckDescription.isVisible({ timeout: 30000 });
  }

  /**
   * Returns whether the deposit amount ($100.00) is visible in Account Activity.
   * @returns {Promise<boolean>}
   */
  async isDepositAmountVisible() {
    await this.depositAmount.waitFor({ timeout: 30000 });
    return this.depositAmount.isVisible({ timeout: 30000 });
  }

  /**
   * Returns whether the updated balance ($316.04) is visible in Account Activity.
   * @returns {Promise<boolean>}
   */
  async isUpdatedBalanceVisible() {
    await this.updatedBalance.waitFor({ timeout: 30000 });
    return this.updatedBalance.isVisible({ timeout: 30000 });
  }

  /**
   * Returns the text content of a transaction row matching the given description.
   * Useful for asserting full row details (date, amount, balance).
   * @param {string} description - Transaction description to search for
   * @returns {Promise<string|null>}
   */
  async getTransactionRowText(description) {
    const row = this.page.locator('tr').filter({ hasText: description });
    await row.waitFor({ timeout: 30000 });
    return row.textContent();
  }
}

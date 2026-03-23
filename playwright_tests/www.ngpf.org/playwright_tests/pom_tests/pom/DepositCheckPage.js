import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class DepositCheckPage extends BasePage {
  /**
   * DepositCheckPage models the Deposit Checks form at /bank-sim/deposit-check.
   * Handles account selection via Angular Material mat-select and amount entry.
   * All selectors are defined as private class properties.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);

    // 'To' account dropdown — Angular Material mat-select combobox
    // 1. page.getByRole('combobox', { name: 'To' })
    // 2. page.locator('mat-select.mat-select-required')
    // 3. page.locator('.mat-select-required')
    // 4. page.locator('mat-select[formcontrolname]')
    // 5. page.locator('mat-form-field mat-select')
    this.toAccountDropdown = page.getByRole('combobox', { name: 'To' });

    // CHECKING account option in the Angular Material listbox overlay
    // 1. page.getByRole('option', { name: 'CHECKING (Available Balance' })
    // 2. page.locator('[role="listbox"]').getByRole('option', { name: 'CHECKING (Available Balance is $216.04)' })
    // 3. page.locator('mat-option').filter({ hasText: 'CHECKING' })
    // 4. page.locator('[role="option"]').filter({ hasText: 'CHECKING' })
    // 5. page.locator('.mat-option').filter({ hasText: 'CHECKING' })
    this.checkingAccountOption = page.getByRole('option', { name: 'CHECKING (Available Balance' });

    // Amount text input — inside Angular Material mat-form-field
    // 1. page.getByRole('textbox', { name: 'Amount' })
    // 2. page.getByRole('textbox', { name: /Amount \*/ })
    // 3. page.getByLabel('Amount *')
    // 4. page.locator('input[formcontrolname="amount"]')
    // 5. page.locator('mat-form-field input[type="text"]').nth(0)
    this.amountInput = page.getByRole('textbox', { name: 'Amount' });

    // Submit button
    // 1. page.getByRole('button', { name: 'Submit' })
    // 2. page.getByRole('button', { name: 'Submit' })
    // 3. page.getByText('Submit')
    // 4. page.locator('button[type="submit"]')
    // 5. page.locator('button').filter({ hasText: /^Submit$/ })
    this.submitBtn = page.getByRole('button', { name: 'Submit' });

    // Cancel button
    // 1. page.getByRole('button', { name: 'Cancel' })
    // 2. page.getByText('Cancel')
    // 3. page.locator('button').filter({ hasText: /^Cancel$/ })
    // 4. page.locator('button[type="button"]').filter({ hasText: 'Cancel' })
    // 5. page.locator('mat-card-actions button').filter({ hasText: 'Cancel' })
    this.cancelBtn = page.getByRole('button', { name: 'Cancel' });

    // DEPOSIT CHECKS sidebar navigation link
    this.depositCheckNavLink = page.locator('a').filter({ hasText: 'DEPOSIT CHECKS' });
  }

  /**
   * Clicks the DEPOSIT CHECKS sidebar navigation link.
   * @returns {Promise<this>}
   */
  async navigateToDepositChecks() {
    await this.depositCheckNavLink.click({ timeout: 30000 });
    return this;
  }

  /**
   * Clicks the 'To' account dropdown to open the Angular Material listbox overlay.
   * @returns {Promise<this>}
   */
  async openAccountDropdown() {
    await this.toAccountDropdown.click({ timeout: 30000 });
    return this;
  }

  /**
   * Selects the CHECKING account from the open Angular Material listbox overlay.
   * Waits for the option to be visible before clicking.
   * @returns {Promise<this>}
   */
  async selectCheckingAccount() {
    await this.checkingAccountOption.waitFor({ timeout: 30000 });
    await this.checkingAccountOption.click({ timeout: 30000 });
    return this;
  }

  /**
   * Enters the deposit amount into the Amount field.
   * Uses click() + pressSequentially() because the input is inside an Angular Material
   * mat-form-field — fill() may not trigger framework change detection reliably.
   * @param {string} amount - e.g. '100.00'
   * @returns {Promise<this>}
   */
  async enterDepositAmount(amount) {
    await this.amountInput.click({ timeout: 30000 });
    await this.amountInput.pressSequentially(amount, { delay: 50 });
    return this;
  }

  /**
   * Clicks the Submit button to process the check deposit.
   * After clicking, the app navigates to /bank-sim/account.
   * @returns {Promise<this>}
   */
  async submitDepositForm() {
    await this.submitBtn.click({ timeout: 45000 });
    return this;
  }

  /**
   * Clicks the Cancel button to discard the deposit form.
   * @returns {Promise<this>}
   */
  async cancelDepositForm() {
    await this.cancelBtn.click({ timeout: 30000 });
    return this;
  }

  /**
   * Verifies that the deposit record is visible in Account Activity.
   * Uses regex to avoid hardcoded balance values.
   * @returns {Promise<void>}
   */
  async verifyDepositInAccountActivity() {
    await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    const depositRecord = this.page.getByText(/Deposit Check/i);
    await depositRecord.first().waitFor({ state: 'visible', timeout: 30000 });
    const amountRecord = this.page.getByText(/\$100\.00/);
    await expect(amountRecord.first()).toBeVisible({ timeout: 30000 });
  }
}

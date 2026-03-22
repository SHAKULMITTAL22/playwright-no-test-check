import { BasePage } from './BasePage.js';

export class DepositCheckPage extends BasePage {
  /**
   * DepositCheckPage encapsulates actions for depositing a check.
   * All selectors are class properties and private to this Page Object.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Account dropdown ('To' account selector)
    // 1. page.getByRole('combobox', { name: 'To' })
    // 2. page.locator('mat-select.mat-select-required')
    // 3. page.locator('.mat-select-required')
    this.accountDropdown = page.getByRole('combobox', { name: 'To' });
    // 'CHECKING' account option
    // 1. page.getByRole('option', { name: 'CHECKING (Available Balance' })
    // 2. page.locator('[role="listbox"]').getByRole('option', { name: 'CHECKING (Available Balance is $216.04)' })
    this.checkingAccountOption = page.getByRole('option', { name: 'CHECKING (Available Balance' });
    // Amount input textbox
    // 1. page.getByRole('textbox', { name: 'Amount' })
    // 2. page.getByRole('textbox', { name: /Amount \*/ })
    // 3. page.getByLabel('Amount *')
    this.amountInput = page.getByRole('textbox', { name: 'Amount' });
    // 'Front' upload button
    // 1. page.getByRole('button', { name: 'Front' })
    // 2. page.getByRole('button', { name: 'Front' }) [duplicate, role_name]
    // 3. page.locator('button.mat-focus-indicator.upload')
    this.frontUploadBtn = page.getByRole('button', { name: 'Front' });
  }

  /**
   * Opens the account dropdown for selecting destination account.
   * @returns {Promise<this>}
   */
  async openAccountDropdown() {
    await this.accountDropdown.click({ timeout: 20000 });
    return this;
  }

  /**
   * Selects the 'CHECKING' account option from the dropdown.
   * @returns {Promise<this>}
   */
  async selectCheckingAccount() {
    await this.checkingAccountOption.click({ timeout: 20000 });
    return this;
  }

  /**
   * Fills the deposit amount into the amount input. (Angular Material input, use pressSequentially as per POM rules.)
   * @param {string} value - Deposit amount (e.g., '100.00')
   * @returns {Promise<this>}
   */
  async fillDepositAmount(value) {
    await this.amountInput.click({ timeout: 20000 });
    await this.amountInput.pressSequentially(value, { delay: 40 });
    return this;
  }

  /**
   * Clicks the 'Front' upload button to start the upload dialog (DO NOT automate file upload).
   * @returns {Promise<this>}
   */
  async clickFrontUpload() {
    await this.frontUploadBtn.click({ timeout: 20000 });
    return this;
  }
}

import { BasePage } from './BasePage.js';

export class DepositCheckPage extends BasePage {
  /**
   * DepositCheckPage handles the complete check deposit workflow including account selection,
   * amount entry, image uploads, and form submission.
   * All selectors are defined as class properties and are private to this Page Object.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    
    // To account dropdown (combobox)
    // 1. page.getByRole('combobox', { name: 'To' })
    // 2. page.locator('mat-select.mat-select-required')
    // 3. page.locator('.mat-select-required')
    // 4. page.locator('mat-form-field mat-select')
    // 5. page.getByLabel('To *')
    this.toAccountDropdown = page.getByRole('combobox', { name: 'To' });
    
    // CHECKING account option in dropdown
    // 1. page.getByRole('option', { name: 'CHECKING (Available Balance' })
    // 2. page.locator('[role="listbox"]').getByRole('option', { name: 'CHECKING (Available Balance is $216.04)' })
    // 3. page.locator('[role="listbox"]').getByRole('option', { name: 'CHECKING (Available Balance is $216.04)' })
    // 4. page.getByText('CHECKING (Available Balance')
    // 5. page.locator('mat-option').filter({ hasText: 'CHECKING' })
    this.checkingAccountOption = page.getByRole('option', { name: 'CHECKING (Available Balance' });
    
    // Amount input field (textbox)
    // 1. page.getByRole('textbox', { name: 'Amount' })
    // 2. page.getByRole('textbox', { name: /Amount \*/ })
    // 3. page.getByLabel('Amount *')
    // 4. page.locator('input[formcontrolname="amount"]')
    // 5. page.locator('mat-form-field input')
    this.amountInput = page.getByRole('textbox', { name: 'Amount' });
    
    // Front check image upload button
    // 1. page.getByRole('button', { name: 'Front' })
    // 2. page.getByRole('button', { name: 'Front' })
    // 3. page.locator('button.mat-focus-indicator.upload')
    // 4. page.getByText('Front')
    // 5. page.locator('button').filter({ hasText: 'Front' })
    this.frontUploadBtn = page.getByRole('button', { name: 'Front' });
    
    // Back check image upload button
    // 1. page.getByRole('button', { name: 'Back' })
    // 2. page.getByRole('button', { name: 'Back' })
    // 3. page.locator('button.mat-focus-indicator.upload')
    // 4. page.getByText('Back')
    // 5. page.locator('button').filter({ hasText: 'Back' })
    this.backUploadBtn = page.getByRole('button', { name: 'Back' });
    
    // Close modal button (close image/text)
    // 1. page.getByText('close')
    // 2. page.locator('[role="dialog"]').getByRole('img', { name: 'close' })
    // 3. page.getByRole('img', { name: 'close' })
    // 4. page.locator('app-upload-check-dialog img')
    // 5. page.locator('[aria-label="close"]')
    this.closeModalBtn = page.getByText('close');
    
    // Submit button
    // 1. page.getByRole('button', { name: 'Submit' })
    // 2. page.getByRole('button', { name: 'Submit' })
    // 3. page.getByText('Submit')
    // 4. page.locator('button[type="submit"]')
    // 5. page.locator('mat-card-actions button')
    this.submitBtn = page.getByRole('button', { name: 'Submit' });
  }

  /**
   * Opens the account selection dropdown.
   * @returns {Promise<this>}
   */
  async openAccountDropdown() {
    await this.toAccountDropdown.click({ timeout: 30000 });
    return this;
  }

  /**
   * Selects the CHECKING account from the dropdown.
   * @returns {Promise<this>}
   */
  async selectCheckingAccount() {
    await this.checkingAccountOption.click({ timeout: 30000 });
    return this;
  }

  /**
   * Enters the deposit amount in the amount field.
   * Uses click + pressSequentially for Angular Material compatibility.
   * @param {string} amount - The deposit amount (e.g., '100.00')
   * @returns {Promise<this>}
   */
  async enterDepositAmount(amount) {
    await this.amountInput.click({ timeout: 30000 });
    await this.amountInput.pressSequentially(amount, { delay: 50, timeout: 45000 });
    return this;
  }

  /**
   * Clicks the Front upload button to simulate front check image upload.
   * @returns {Promise<this>}
   */
  async clickFrontUpload() {
    await this.frontUploadBtn.click({ timeout: 45000 });
    return this;
  }

  /**
   * Closes the front check image modal.
   * @returns {Promise<this>}
   */
  async closeFrontModal() {
    await this.closeModalBtn.click({ timeout: 30000 });
    return this;
  }

  /**
   * Clicks the Back upload button to simulate back check image upload.
   * @returns {Promise<this>}
   */
  async clickBackUpload() {
    await this.backUploadBtn.click({ timeout: 45000 });
    return this;
  }

  /**
   * Closes the back check image modal.
   * @returns {Promise<this>}
   */
  async closeBackModal() {
    await this.closeModalBtn.click({ timeout: 30000 });
    return this;
  }

  /**
   * Submits the check deposit form.
   * @returns {Promise<this>}
   */
  async submitDeposit() {
    await this.submitBtn.click({ timeout: 60000 });
    return this;
  }
}
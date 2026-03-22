import { expect } from '@playwright/test';

export class MakeTransferPage {
  /**
   * Encapsulates all actions within /transfer page for making a transfer.
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    // PAYMENT FREQUENCY dropdown
    // 1. page.getByRole('combobox', { name: 'PAYMENT FREQUENCY' })
    // 2. page.locator('mat-select.mat-select-required')
    this.paymentFrequencyDropdown = page.getByRole('combobox', { name: 'PAYMENT FREQUENCY' });
    // SINGLE option
    // 1. page.getByRole('option', { name: 'SINGLE' })
    // 2. page.locator('[role="listbox"]').getByRole('option', { name: 'SINGLE' })
    this.singleFrequencyOption = page.getByRole('option', { name: 'SINGLE' });

    // TRANSFER FROM dropdown
    // 1. page.getByRole('combobox', { name: 'Transfer From' })
    this.transferFromDropdown = page.getByRole('combobox', { name: 'Transfer From' });
    // CHECKING option (captured with actual value)
    // 1. page.getByRole('option', { name: 'CHECKING ($216.04)' })
    this.transferFromCheckingOption = page.getByRole('option', { name: 'CHECKING ($216.04)' });

    // TRANSFER TO dropdown
    // 1. page.getByRole('combobox', { name: 'Transfer To' })
    this.transferToDropdown = page.getByRole('combobox', { name: 'Transfer To' });
    // SAVING option (captured with actual value)
    // 1. page.getByRole('option', { name: 'SAVING ($230.00)' })
    this.transferToSavingOption = page.getByRole('option', { name: 'SAVING ($230.00)' });

    // Amount input
    // 1. page.getByRole('spinbutton', { name: 'Amount' })
    // 2. page.getByRole('textbox', { name: /Amount \*/ })
    this.amountInput = page.getByRole('spinbutton', { name: 'Amount' });

    // Payment Date input
    // 1. page.getByRole('textbox', { name: 'Payment Date' })
    // 2. page.getByRole('textbox', { name: /Payment Date \*/ })
    // 3. page.getByLabel('Payment Date *')
    this.paymentDateInput = page.getByRole('textbox', { name: 'Payment Date' });

    // Save button
    // 1. page.getByRole('button', { name: 'Save' })
    this.saveBtn = page.getByRole('button', { name: 'Save' });
  }

  /**
   * Opens payment frequency dropdown.
   * @returns {Promise<this>}
   */
  async openPaymentFrequencyDropdown() {
    await this.paymentFrequencyDropdown.click({ timeout: 20000 });
    return this;
  }

  /**
   * Selects 'SINGLE' in Payment Frequency.
   * @returns {Promise<this>}
   */
  async selectPaymentFrequencySingle() {
    await this.singleFrequencyOption.click({ timeout: 20000 });
    return this;
  }

  /**
   * Opens the Transfer From (source account) dropdown.
   * @returns {Promise<this>}
   */
  async openTransferFromDropdown() {
    await this.transferFromDropdown.click({ timeout: 20000 });
    return this;
  }

  /**
   * Selects 'CHECKING ($216.04)' as the transfer source.
   * @returns {Promise<this>}
   */
  async selectTransferFromChecking() {
    await this.transferFromCheckingOption.click({ timeout: 20000 });
    return this;
  }

  /**
   * Opens the Transfer To (destination account) dropdown.
   * @returns {Promise<this>}
   */
  async openTransferToDropdown() {
    await this.transferToDropdown.click({ timeout: 20000 });
    return this;
  }

  /**
   * Selects 'SAVING ($230.00)' as the transfer destination.
   * @returns {Promise<this>}
   */
  async selectTransferToSaving() {
    await this.transferToSavingOption.click({ timeout: 20000 });
    return this;
  }

  /**
   * Inputs transfer amount into the Amount field.
   * @param {string|number} value
   * @returns {Promise<this>}
   */
  async inputTransferAmount(value) {
    await this.amountInput.fill(''); // Clear first
    await this.amountInput.fill(`${value}`);
    return this;
  }

  /**
   * Inputs date into the Payment Date field (direct text input, not using calendar picker).
   * @param {string} dateStr
   * @returns {Promise<this>}
   */
  async inputPaymentDate(dateStr) {
    await this.paymentDateInput.fill('');
    await this.paymentDateInput.fill(dateStr);
    return this;
  }

  /**
   * Clicks Save button to submit the transfer.
   * @returns {Promise<this>}
   */
  async submitTransfer() {
    await this.saveBtn.click({ timeout: 45000 });
    return this;
  }
}

import { BasePage } from './BasePage.js';

export class TransferPage extends BasePage {
  constructor(page) {
    super(page);
    this.frequencyDropdown = page.getByRole('combobox', { name: 'PAYMENT FREQUENCY' });
    this.singleOption = page.getByRole('option', { name: 'SINGLE' });
    this.sourceAccountDropdown = page.getByRole('combobox', { name: 'Transfer From' });
    this.checkingOption = page.getByRole('option', { name: /CHECKING/ });
    this.destinationAccountDropdown = page.getByRole('combobox', { name: 'Transfer To' });
    this.savingOption = page.getByRole('option', { name: /SAVING/ });
    this.amountInput = page.getByRole('spinbutton', { name: 'Amount' });
    this.dateInput = page.getByRole('textbox', { name: 'Payment Date' });
    this.saveBtn = page.getByRole('button', { name: 'Save' });
  }

  async openFrequencyDropdown() {
    await this.frequencyDropdown.click({ timeout: 30000 });
    return this;
  }

  async selectSingleFrequency() {
    await this.singleOption.click({ timeout: 30000 });
    return this;
  }

  async openSourceAccountDropdown() {
    await this.sourceAccountDropdown.click({ timeout: 30000 });
    return this;
  }

  async selectCheckingAccount() {
    // Use .first() to handle potential multiple matches in Angular Material overlays
    await this.checkingOption.first().click({ timeout: 30000 });
    return this;
  }

  async openDestinationAccountDropdown() {
    await this.destinationAccountDropdown.click({ timeout: 30000 });
    return this;
  }

  async selectSavingAccount() {
    // Use .first() to handle potential multiple matches in Angular Material overlays
    await this.savingOption.first().click({ timeout: 30000 });
    return this;
  }

  async enterTransferAmount(amount) {
    // Using click + pressSequentially for Angular Material inputs as per guidelines
    await this.amountInput.click({ timeout: 30000 });
    await this.amountInput.pressSequentially(amount.toString(), { delay: 50 });
    return this;
  }

  async enterPaymentDate(date) {
    await this.dateInput.click({ timeout: 30000 });
    await this.dateInput.pressSequentially(date, { delay: 50 });
    // Press Escape to close the date picker overlay which might block other elements
    await this.page.keyboard.press('Escape');
    // Also click away to ensure the overlay is dismissed
    await this.page.mouse.click(10, 10);
    return this;
  }

  async submitTransfer() {
    // Use force: true to bypass the backdrop if it's still present
    await this.saveBtn.click({ timeout: 30000, force: true });
    return this;
  }
}

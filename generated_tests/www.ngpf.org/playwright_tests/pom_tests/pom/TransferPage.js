import { BasePage } from './BasePage.js';

export class TransferPage extends BasePage {
  constructor(page) {
    super(page);
    this.frequencyDropdown = page.getByRole('combobox', { name: 'PAYMENT FREQUENCY' });
    this.fromAccountDropdown = page.getByRole('combobox', { name: 'Transfer From' });
    this.toAccountDropdown = page.getByRole('combobox', { name: 'Transfer To' });
    this.amountInput = page.getByRole('spinbutton', { name: 'Amount' });
    this.saveBtn = page.getByRole('button', { name: 'Save' });
  }

  async selectFrequency(option) {
    await this.frequencyDropdown.click({ timeout: 30000 });
    await this.page.locator('.mat-select-panel').first().getByRole('option', { name: option }).click({ timeout: 30000 });
    return this;
  }

  async selectFromAccount(account) {
    await this.fromAccountDropdown.click({ timeout: 30000 });
    await this.page.locator('.mat-select-panel').first().getByRole('option', { name: account }).click({ timeout: 30000 });
    return this;
  }

  async selectToAccount(account) {
    await this.toAccountDropdown.click({ timeout: 30000 });
    await this.page.locator('.mat-select-panel').first().getByRole('option', { name: account }).click({ timeout: 30000 });
    return this;
  }

  async enterAmount(amount) {
    await this.amountInput.click({ timeout: 30000 });
    await this.amountInput.pressSequentially(amount, { delay: 50 });
    return this;
  }

  async clickSave() {
    await this.saveBtn.click({ timeout: 60000 });
    return this;
  }
}
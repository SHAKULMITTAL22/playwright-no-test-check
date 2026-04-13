import { BasePage } from './BasePage.js';

export class TransferPage extends BasePage {
  constructor(page) {
    super(page);
    this.makeTransferLink = page.locator('a').filter({ hasText: 'MAKE A TRANSFER' });
    this.saveBtn = page.getByRole('button', { name: 'Save' });
    this.paymentFrequency = page.getByRole('combobox', { name: 'PAYMENT FREQUENCY' });
    this.amountInput = page.getByRole('spinbutton', { name: 'Amount' });
  }

  async navigateToMakeTransfer() {
    await this.makeTransferLink.click({ timeout: 30000 });
  }

  async setFrequency(frequency) {
    await this.paymentFrequency.click({ timeout: 30000 });
    await this.page.getByRole('option', { name: frequency }).click();
  }

  async setAmount(amount) {
    await this.amountInput.click({ timeout: 30000 });
    await this.amountInput.pressSequentially(amount, { delay: 50 });
  }

  async submitTransfer() {
    await this.saveBtn.click({ timeout: 30000 });
  }
}
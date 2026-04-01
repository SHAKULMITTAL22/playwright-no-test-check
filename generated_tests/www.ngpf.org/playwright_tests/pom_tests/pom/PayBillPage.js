import { BasePage } from './BasePage.js';

export class PayBillPage extends BasePage {
  constructor(page) {
    super(page);
    this.paymentFrequencyDropdown = page.getByRole('combobox', { name: 'Payment Frequency' });
    this.singleOption = page.getByRole('option', { name: 'SINGLE' });
    this.addRecipientBtn = page.getByText('ADD RECIPIENT');
    this.recipientNameInput = page.getByRole('textbox', { name: 'RECIPIENT NAME' });
    this.submitRecipientBtn = page.getByRole('button', { name: 'SUBMIT' });
    this.amountInput = page.getByRole('textbox', { name: 'Amount' });
  }

  async selectPaymentFrequency() {
    await this.paymentFrequencyDropdown.click({ timeout: 30000 });
    await this.singleOption.click({ timeout: 30000 });
    // Wait for the dropdown overlay to disappear
    await this.page.waitForSelector('.cdk-overlay-container .cdk-overlay-backdrop-showing', { state: 'hidden', timeout: 10000 }).catch(() => {});
    return this;
  }

  async clickAddRecipient() {
    await this.addRecipientBtn.click({ timeout: 30000 });
    return this;
  }

  async fillRecipientName(name) {
    await this.recipientNameInput.click({ timeout: 30000 });
    await this.recipientNameInput.pressSequentially(name, { delay: 50 });
    return this;
  }

  async submitRecipient() {
    await this.submitRecipientBtn.click({ timeout: 30000 });
    return this;
  }

  async fillAmount(amount) {
    await this.amountInput.click({ timeout: 30000 });
    await this.amountInput.pressSequentially(amount, { delay: 50 });
    return this;
  }
}
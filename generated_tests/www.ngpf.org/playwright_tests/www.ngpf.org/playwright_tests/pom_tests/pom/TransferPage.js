import { BasePage } from './BasePage.js';

export class TransferPage extends BasePage {
  constructor(page) {
    super(page);
    this.makeTransferLink = page.locator('a').filter({ hasText: 'MAKE A TRANSFER' });
    this.saveBtn = page.getByRole('button', { name: 'Save' });
    this.paymentFrequency = page.locator('mat-select[formcontrolname="frequency"]');
    this.transferFrom = page.locator('mat-select[formcontrolname="fromAccount"]');
    this.transferTo = page.locator('mat-select[formcontrolname="toAccount"]');
    this.amountInput = page.locator('input[formcontrolname="amount"]');
  }

  async navigateToTransferForm() {
    await this.makeTransferLink.click({ timeout: 30000 });
  }

  async fillTransferForm(frequency, from, to, amount) {
    // Select Frequency
    await this.paymentFrequency.click();
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
    
    // Select From
    await this.transferFrom.click();
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
    
    // Select To
    await this.transferTo.click();
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
    
    // Fill Amount
    await this.amountInput.click();
    await this.amountInput.pressSequentially(amount, { delay: 50 });
  }

  async submitTransfer() {
    await this.saveBtn.click({ timeout: 30000 });
  }
}
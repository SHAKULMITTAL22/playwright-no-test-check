import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.okBtn = page.getByRole('button', { name: 'Ok' });
    this.transfersMenu = page.locator('a').filter({ hasText: 'TRANSFERS expand_more' });
    this.makeTransferLink = page.locator('a').filter({ hasText: 'MAKE A TRANSFER' });
    // Added for Bill Payment workflow
    this.billsMenu = page.locator('a').filter({ hasText: 'BILLS expand_more' });
    this.payBillLink = page.locator('a').filter({ hasText: 'PAY BILL' });
  }

  async dismissWelcomeModal() {
    await this.okBtn.click({ timeout: 30000 });
    return this;
  }

  async navigateToTransfers() {
    await this.transfersMenu.click({ timeout: 30000 });
    await this.makeTransferLink.click({ timeout: 30000 });
    return this;
  }

  async navigateToPayBill() {
    await this.billsMenu.click({ timeout: 30000 });
    await this.payBillLink.click({ timeout: 30000 });
    return this;
  }
}
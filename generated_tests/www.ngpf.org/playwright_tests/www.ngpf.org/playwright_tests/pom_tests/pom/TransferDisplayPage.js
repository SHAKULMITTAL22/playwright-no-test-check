import { BasePage } from './BasePage.js';

export class TransferDisplayPage extends BasePage {
  constructor(page) {
    super(page);
    this.saveBtn = page.getByRole('button', { name: 'Save' });
  }

  async submitTransfer() {
    await this.saveBtn.click({ timeout: 60000 });
  }
}
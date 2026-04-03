import { BasePage } from './BasePage.js';

class TransferPage extends BasePage {
  constructor(page) {
    super(page);
    this.amountInput = page.getByRole('spinbutton', { name: 'Amount' });
  }

  async enterAmount(amount) {
    await this.amountInput.fill(amount.toString(), { timeout: 30000 });
    return this;
  }
}

export { TransferPage };
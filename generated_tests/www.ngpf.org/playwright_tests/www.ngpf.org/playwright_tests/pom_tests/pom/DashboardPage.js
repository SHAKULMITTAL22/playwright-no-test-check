import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.transfersMenu = page.locator('a').filter({ hasText: 'TRANSFERS expand_more' });
    this.makeATransferLink = page.locator('a').filter({ hasText: 'MAKE A TRANSFER' });
  }

  async expandTransfersMenu() {
    await this.transfersMenu.click({ timeout: 30000 });
    return this;
  }

  async clickMakeATransfer() {
    await this.makeATransferLink.click({ timeout: 30000 });
    return this;
  }
}

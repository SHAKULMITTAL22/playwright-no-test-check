import { BasePage } from './BasePage.js';

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.transfersMenu = page.locator('a').filter({ hasText: 'TRANSFERS' });
    this.makeTransferLink = page.locator('a').filter({ hasText: 'MAKE A TRANSFER' });
  }

  async dismissWelcomeModal() {
    await this.page.waitForLoadState('networkidle');
    
    // Target the button specifically within the CDK overlay
    const okBtn = this.page.locator('.cdk-overlay-pane button:has-text("Ok")');

    try {
      if (await okBtn.isVisible({ timeout: 5000 })) {
        await okBtn.click({ force: true });
        // Wait for the modal to be removed
        await this.page.waitForSelector('.cdk-overlay-pane', { state: 'hidden', timeout: 10000 });
      }
    } catch (e) {
      console.log('Modal dismissal attempt finished:', e.message);
    }
  }

  async navigateToTransfer() {
    await this.dismissWelcomeModal();
    await this.transfersMenu.click();
    await this.makeTransferLink.waitFor({ state: 'visible', timeout: 10000 });
    
    await Promise.all([
      this.page.waitForURL('**/transfer'),
      this.makeTransferLink.click({ force: true })
    ]);
    
    const { TransferPage } = await import('./TransferPage.js');
    return new TransferPage(this.page);
  }
}

export { DashboardPage };
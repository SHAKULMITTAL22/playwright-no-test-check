import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors - Using more robust locators that handle potential hidden text or icon suffixes
    this.getStartedBtn = page.getByRole('button', { name: /GET STARTED NOW/i });
    this.welcomeOkBtn = page.getByRole('button', { name: 'Ok' });
    
    // Using filter with hasText is often more robust for Material sidebars where icons and text are mixed
    this.billsMenu = page.locator('a').filter({ hasText: 'BILLS' });
    this.manageRecipientMenu = page.locator('a').filter({ hasText: 'MANAGE RECIPIENT' });
    this.payBillMenu = page.locator('a').filter({ hasText: 'PAY BILL' });
  }

  async clickGetStarted() {
    await this.getStartedBtn.click({ timeout: 30000 });
    return this;
  }

  async clickWelcomeOk() {
    await this.welcomeOkBtn.click({ timeout: 30000 });
    return this;
  }

  async clickBillsMenu() {
    // Check if the menu is already expanded by looking for one of its items
    // We use a short timeout for isVisible to avoid long waits
    const isExpanded = await this.payBillMenu.isVisible().catch(() => false);
    if (!isExpanded) {
      // If the sidebar is collapsed, the text might be hidden. 
      // We click the link which should contain the icon even if text is hidden.
      await this.billsMenu.first().click({ timeout: 30000 });
      // Wait for the sub-menu to appear
      await this.payBillMenu.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    }
    return this;
  }

  async clickManageRecipientMenu() {
    await this.manageRecipientMenu.first().click({ timeout: 30000 });
    return this;
  }

  async clickPayBillMenu() {
    await this.payBillMenu.first().click({ timeout: 30000 });
    return this;
  }
}

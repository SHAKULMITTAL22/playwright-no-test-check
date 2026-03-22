import { BasePage } from './BasePage.js';

export class SidebarPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'TRANSFERS expand_more' sidebar anchor (app-menu-list-item)
    // Primary: page.locator('a').filter({ hasText: 'TRANSFERS expand_more' })
    // Alt: page.locator('a.mat-list-item.mat-focus-indicator') (not unique)
    this.transfersSidebarLink = this.page.locator('a').filter({ hasText: 'TRANSFERS expand_more' });
    // 'DISPLAY ALL TRANSFERS' sidebar link (app-menu-list-item)
    // Primary: page.locator('a').filter({ hasText: 'DISPLAY ALL TRANSFERS' })
    // Alt: page.getByText('DISPLAY ALL TRANSFERS')
    // Alt: page.locator('a').filter({ hasText: /^DISPLAY ALL TRANSFERS$/ })
    this.displayAllTransfersLink = this.page.locator('a').filter({ hasText: 'DISPLAY ALL TRANSFERS' });
  }

  /**
   * Expands the 'TRANSFERS' section in the sidebar.
   */
  async expandTransfersSidebar() {
    await this.transfersSidebarLink.click({ timeout: 30000 });
    // Optionally wait for the expanded content to become visible if necessary (selector not captured here)
    return this;
  }

  /**
   * Clicks 'DISPLAY ALL TRANSFERS' to open the transfer history page. Waits for navigation.
   */
  async viewAllTransfers() {
    await this.displayAllTransfersLink.click({ timeout: 30000 });
    await this.page.waitForURL('**/transfer/display-transfers**', { timeout: 60000 });
    return this;
  }
}

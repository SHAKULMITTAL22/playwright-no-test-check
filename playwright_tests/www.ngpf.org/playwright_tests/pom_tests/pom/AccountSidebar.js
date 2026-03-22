import { BasePage } from './BasePage.js';

export class AccountSidebar extends BasePage {
  /**
   * AccountSidebar encapsulates sidebar navigation actions such as clicking on 'DEPOSIT CHECKS'.
   * Selectors are private to this Page Object.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'DEPOSIT CHECKS' sidebar link
    // 1. page.locator('a').filter({ hasText: 'DEPOSIT CHECKS' })
    // 2. page.getByText('DEPOSIT CHECKS')
    // 3. page.locator('a').filter({ hasText: /^DEPOSIT CHECKS$/ })
    this.depositChecksLink = page.locator('a').filter({ hasText: 'DEPOSIT CHECKS' });
  }

  /**
   * Clicks the 'DEPOSIT CHECKS' link in the sidebar to navigate to the Deposit Checks page.
   * @returns {Promise<this>}
   */
  async navigateDepositChecks() {
    await this.depositChecksLink.click({ timeout: 30000 });
    return this;
  }
}

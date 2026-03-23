import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  /**
   * DashboardPage handles the main dashboard after onboarding, including welcome modal dismissal
   * and navigation to various banking features via the sidebar.
   * All selectors are defined as class properties and are private to this Page Object.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    
    // Ok button in welcome modal (dismissal)
    // 1. page.getByRole('button', { name: 'Ok' })
    // 2. page.locator('[role="dialog"]').getByRole('button', { name: 'Ok' })
    // 3. page.getByRole('button', { name: 'Ok' })
    // 4. page.locator('#mat-dialog-0').getByRole('button', { name: 'Ok' })
    // 5. page.locator('app-welcome-dialog').getByRole('button', { name: 'Ok' })
    this.welcomeOkBtn = page.getByRole('button', { name: 'Ok' });
    
    // DEPOSIT CHECKS navigation link
    // 1. page.locator('a').filter({ hasText: 'DEPOSIT CHECKS' })
    // 2. page.getByText('DEPOSIT CHECKS')
    // 3. page.locator('a').filter({ hasText: /^DEPOSIT CHECKS$/ })
    // 4. page.locator('app-menu-list-item').filter({ hasText: 'DEPOSIT CHECKS' })
    // 5. page.locator('mat-nav-list a').filter({ hasText: 'DEPOSIT CHECKS' })
    this.depositChecksLink = page.locator('a').filter({ hasText: 'DEPOSIT CHECKS' });
    
    // ACCOUNTS navigation link with expand_more
    // 1. page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' })
    // 2. page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' })
    // 3. page.locator('a.mat-list-item.mat-focus-indicator')
    // 4. page.getByText('ACCOUNTS expand_more')
    // 5. page.locator('app-menu-list-item').filter({ hasText: 'ACCOUNTS' })
    this.accountsLink = page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' });
  }

  /**
   * Dismisses the welcome modal by clicking Ok button.
   * @returns {Promise<this>}
   */
  async dismissWelcomeModal() {
    await this.welcomeOkBtn.click({ timeout: 45000 });
    return this;
  }

  /**
   * Navigates to the check deposit feature from sidebar.
   * @returns {Promise<this>}
   */
  async navigateToDepositChecks() {
    await this.depositChecksLink.click({ timeout: 45000 });
    return this;
  }

  /**
   * Navigates to the accounts section from sidebar.
   * @returns {Promise<this>}
   */
  async navigateToAccounts() {
    await this.accountsLink.click({ timeout: 45000 });
    return this;
  }
}
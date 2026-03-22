import { BasePage } from './BasePage.js';

export class SimulatorPage extends BasePage {
  /**
   * SimulatorPage models main simulator overlays such as the welcome modal.
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Ok button in welcome modal
    // 1. page.getByRole('button', { name: 'Ok' })
    // 2. page.locator('[role="dialog"]').getByRole('button', { name: 'Ok' })
    // 3. page.getByText('Ok')
    this.welcomeModalOkBtn = page.getByRole('button', { name: 'Ok' });
  }

  /**
   * Dismiss the welcome overlay/modal by clicking Ok.
   * @returns {Promise<this>}
   */
  async dismissWelcomeModal() {
    await this.welcomeModalOkBtn.click({ timeout: 20000 });
    return this;
  }
}
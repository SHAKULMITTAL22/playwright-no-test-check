import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'GET STARTED NOW' button (Angular Material mat-card-content)
    // Primary: page.getByRole('button', { name: 'GET STARTED NOW' })
    // Alt: page.getByRole('button', { name: /GET STARTED NOW/ })
    // Alt: page.getByText('GET STARTED NOW')
    this.getStartedBtn = this.page.getByRole('button', { name: 'GET STARTED NOW' });
    // 'Ok' Button (Welcome Modal, app-welcome-dialog)
    // Primary: page.getByRole('button', { name: 'Ok' })
    // Alt: page.locator('[role="dialog"]').getByRole('button', { name: 'Ok' })
    this.okWelcomeModalBtn = this.page.getByRole('button', { name: 'Ok' });
  }

  /**
   * Clicks the 'GET STARTED NOW' button to begin simulation.
   * No navigation occurs; modal appears in-place. Returns HomePage.
   */
  async clickGetStarted() {
    await this.getStartedBtn.click({ timeout: 30000 });
    // No navigation expected, just returns HomePage
    return this;
  }

  /**
   * Dismisses the Welcome modal by clicking the 'Ok' button.
   * Waits for button to disappear, ensuring modal is closed.
   */
  async dismissWelcomeModal() {
    await this.okWelcomeModalBtn.click({ timeout: 30000 });
    // Modal closes, wait for disappearance
    await this.page.waitForSelector('text=Ok', { state: 'detached', timeout: 30000 });
    return this;
  }
}

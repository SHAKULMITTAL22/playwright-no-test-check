import { BasePage } from './BasePage.js';

export class OnboardingModal extends BasePage {
  /**
   * OnboardingModal encapsulates modal onboarding dialog step (Ok button dismiss).
   * All selectors are private to this Page Object.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Ok button (onboarding modal dialog)
    // 1. page.getByRole('button', { name: 'Ok' })
    // 2. page.locator('[role="dialog"]').getByRole('button', { name: 'Ok' })
    // 3. page.getByText('Ok')
    this.okBtn = page.getByRole('button', { name: 'Ok' });
  }

  /**
   * Clicks Ok to dismiss onboarding modal.
   * @returns {Promise<this>}
   */
  async dismissModal() {
    await this.okBtn.click({ timeout: 20000 });
    return this;
  }
}

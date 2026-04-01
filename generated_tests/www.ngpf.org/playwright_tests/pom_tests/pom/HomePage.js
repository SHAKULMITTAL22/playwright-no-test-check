import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.getStartedBtn = page.getByRole('button', { name: 'GET STARTED NOW' });
  }

  async clickGetStarted() {
    await this.getStartedBtn.click({ timeout: 30000 });
    return this;
  }
}
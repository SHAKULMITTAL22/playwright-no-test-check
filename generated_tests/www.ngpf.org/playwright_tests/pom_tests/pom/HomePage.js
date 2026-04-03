import { BasePage } from './BasePage.js';

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.getStartedBtn = page.getByRole('button', { name: 'GET STARTED NOW' });
  }

  async clickGetStarted() {
    await this.getStartedBtn.click({ timeout: 30000 });
    const { DashboardPage } = await import('./DashboardPage.js');
    return new DashboardPage(this.page);
  }
}

export { HomePage };
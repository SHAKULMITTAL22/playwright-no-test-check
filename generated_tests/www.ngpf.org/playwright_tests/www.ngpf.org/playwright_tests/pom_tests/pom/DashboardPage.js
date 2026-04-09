import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.startSimulationBtn = page.getByRole('button', { name: 'GET STARTED NOW' });
    this.transfersMenu = page.locator('a').filter({ hasText: 'TRANSFERS expand_more' });
    this.okButton = page.getByRole('button', { name: 'Ok' });
  }

  async startSimulation() {
    await this.startSimulationBtn.click({ timeout: 30000 });
    // Handle welcome modal if it appears
    try {
      await this.okButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.okButton.click();
    } catch (e) {
      // Modal did not appear, continue
    }
  }

  async expandTransfersMenu() {
    await this.transfersMenu.click({ timeout: 30000 });
  }
}
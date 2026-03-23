import { BasePage } from './BasePage.js';

export class LandingPage extends BasePage {
  /**
   * LandingPage models the landing screen for Bank Sim, with the GET STARTED NOW button.
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // GET STARTED NOW button
    // 1. page.getByRole('button', { name: 'GET STARTED NOW' })
    // 2. page.getByRole('button', { name: /GET STARTED NOW/ })
    // 3. page.getByText('GET STARTED NOW')
    this.getStartedNowBtn = page.getByRole('button', { name: 'GET STARTED NOW' });
  }

  /**
   * Navigates to the NGPF Bank Simulator landing page.
   * Uses domcontentloaded since the app redirects before settling at /bank-sim.
   * @returns {Promise<this>}
   */
  async navigateToSite() {
    await this.page.goto('https://www.ngpf.org/bank-sim', { waitUntil: 'domcontentloaded', timeout: 60000 });
    return this;
  }

  /**
   * Clicks the GET STARTED NOW button to enter the simulator.
   * @returns {Promise<this>}
   */
  async clickGetStarted() {
    await this.getStartedNowBtn.click({ timeout: 20000 });
    return this;
  }
}

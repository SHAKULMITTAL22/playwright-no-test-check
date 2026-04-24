import { BasePage } from './BasePage.js';

export class MortgageHomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    
    // Selectors
    // Primary: page.getByRole('link', { name: 'בואו נתחיל' })
    // Alternate: page.getByRole('link', { name: /בואו נתחיל/ })
    // Alternate: page.locator('[class*="Menu"]').getByRole('link', { name: 'בואו נתחיל' })
    this.startApplicationLink = page.getByRole('link', { name: 'בואו נתחיל' }).first();
  }

  /**
   * Navigate to the homepage
   * @returns {Promise<MortgageHomePage>}
   */
  async navigateToHomePage() {
    await this.page.goto('https://mortgage.leumi.co.il', { waitUntil: 'domcontentloaded', timeout: 60000 });
    return this;
  }

  /**
   * Click the 'Let\'s start' button to initiate the application
   * @returns {Promise<MortgageHomePage>}
   */
  async clickStartApplication() {
    await this.startApplicationLink.click({ timeout: 30000 });
    return this;
  }
}

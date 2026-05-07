import { BasePage } from './BasePage.js';

export class BeginnersMortgagePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    
    // Selectors
    // Primary: page.getByLabel('סגור')
    // Alternate: page.locator('[aria-label="סגור"]')
    this.closeChatPopupBtn = page.getByLabel('סגור');
    
    // Primary: page.getByRole('link', { name: 'בואו נתחיל' })
    // Alternate: page.getByRole('link', { name: /בואו נתחיל/ })
    // Alternate: page.locator('[class*="Menu"]').getByRole('link', { name: 'בואו נתחיל' })
    this.startApplicationLink = page.getByRole('link', { name: 'בואו נתחיל' });
  }

  /**
   * Navigate to Beginners Page
   * @returns {Promise<BeginnersMortgagePage>}
   */
  async navigateToBeginnersPage() {
    await this.page.goto('https://mortgage.leumi.co.il/all-about-mortgage/category/beginners/first-step-0', { waitUntil: 'domcontentloaded', timeout: 60000 });
    return this;
  }

  /**
   * Close Chat Popup
   * @returns {Promise<BeginnersMortgagePage>}
   */
  async closeChatPopup() {
    await this.closeChatPopupBtn.click({ timeout: 15000 });
    return this;
  }

  /**
   * Click Start Application Button
   * @returns {Promise<BeginnersMortgagePage>}
   */
  async clickStartApplication() {
    await this.startApplicationLink.click({ timeout: 45000 });
    return this;
  }
}

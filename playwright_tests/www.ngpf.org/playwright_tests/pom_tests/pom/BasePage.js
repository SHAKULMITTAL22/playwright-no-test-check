export class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }
  /**
   * Wait for a specific url pattern.
   * @param {string|RegExp} urlPattern
   * @param {number} timeoutMs
   * @returns {Promise<this>}
   */
  async waitForUrl(urlPattern, timeoutMs = 60000) {
    await this.page.waitForURL(urlPattern, { timeout: timeoutMs });
    return this;
  }
  /**
   * Wait for the page to reach network idle.
   * @param {number} timeoutMs
   * @returns {Promise<this>}
   */
  async waitForNetworkIdle(timeoutMs = 30000) {
    await this.page.waitForLoadState('networkidle', { timeout: timeoutMs });
    return this;
  }
}

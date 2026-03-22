export class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }
  /**
   * Waits for navigation to a given URL substring. Used for cross-page transitions.
   * @param {string} urlFragment
   * @param {number} [timeout=60000]
   */
  async waitForUrl(urlFragment, timeout = 60000) {
    await this.page.waitForURL(`**${urlFragment}**`, { timeout });
    return this;
  }

  /**
   * Generic wait for selector utility (safe for modal transitions, overlays, etc).
   * @param {string} selector
   * @param {number} timeout
   */
  async waitForSelector(selector, timeout = 30000) {
    await this.page.waitForSelector(selector, { timeout });
    return this;
  }
}

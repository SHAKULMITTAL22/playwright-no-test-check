import { BasePage } from './BasePage.js';

export class ManageRecipientPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors
    this.addRecipientBtn = page.getByText('addADD RECIPIENT');
    // Alternate selectors for addRecipientBtn:
    // page.getByText('addADD RECIPIENT')
    // page.locator('div.add-button')
    // page.locator('div').filter({ hasText: /^addADD RECIPIENT$/ })
    // page.locator('div').filter({ hasText: 'addADD RECIPIENT' })
    // page.locator('xpath=html/body/app-root/app-main/mat-drawer-container/mat-drawer-content/div/app-manage-recipient/div/mat-card/mat-card-content/div[2]/div[1]/div/div')

    this.recipientNameInput = page.getByRole('textbox', { name: 'RECIPIENT NAME' });
    // Alternate selectors for recipientNameInput:
    // page.locator('form[action*="manage-recipient"]').getByRole('textbox', { name: /RECIPIENT NAME \*/ })
    // page.locator('[role="dialog"]').getByRole('textbox', { name: 'RECIPIENT NAME *' })
    // page.getByRole('textbox', { name: /RECIPIENT NAME \*/ })
    // page.getByLabel('RECIPIENT NAME *')
    // page.getByLabel('RECIPIENT NAME *')

    this.addressInput = page.getByRole('textbox', { name: 'ADDRESS' });
    // Alternate selectors for addressInput:
    // page.locator('form[action*="manage-recipient"]').getByRole('textbox', { name: 'ADDRESS' })
    // page.locator('[role="dialog"]').getByRole('textbox', { name: 'ADDRESS' })
    // page.getByRole('textbox', { name: 'ADDRESS' })
    // page.getByLabel('ADDRESS')
    // page.getByLabel('ADDRESS', { exact: true })

    this.cityInput = page.getByRole('textbox', { name: 'CITY' });
    // Alternate selectors for cityInput:
    // page.locator('form[action*="manage-recipient"]').getByRole('textbox', { name: 'CITY' })
    // page.locator('[role="dialog"]').getByRole('textbox', { name: 'CITY' })
    // page.getByRole('textbox', { name: 'CITY' })
    // page.getByLabel('CITY')
    // page.getByLabel('CITY', { exact: true })

    this.submitBtn = page.getByRole('button', { name: 'SUBMIT' });
    // Alternate selectors for submitBtn:
    // page.locator('form[action*="manage-recipient"]').getByRole('button', { name: 'SUBMIT' })
    // page.locator('[role="dialog"]').getByRole('button', { name: 'SUBMIT' })
    // page.getByRole('button', { name: 'SUBMIT' })
    // page.locator('[role="dialog"]').getByText('SUBMIT')
    // page.locator('[role="dialog"]').getByText('SUBMIT')
  }

  async clickAddRecipient() {
    await this.addRecipientBtn.click({ timeout: 30000 });
    return this;
  }

  async fillRecipientName(name) {
    await this.recipientNameInput.click({ timeout: 30000 });
    await this.recipientNameInput.pressSequentially(name, { delay: 50 });
    return this;
  }

  async fillAddress(address) {
    await this.addressInput.click({ timeout: 30000 });
    await this.addressInput.pressSequentially(address, { delay: 50 });
    return this;
  }

  async fillCity(city) {
    await this.cityInput.click({ timeout: 30000 });
    await this.cityInput.pressSequentially(city, { delay: 50 });
    return this;
  }

  async clickSubmit() {
    await this.submitBtn.click({ timeout: 30000 });
    return this;
  }
}

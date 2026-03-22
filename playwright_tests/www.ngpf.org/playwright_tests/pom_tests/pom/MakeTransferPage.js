import { expect } from '@playwright/test';

export class MakeTransferPage {
  constructor(page) {
    this.page = page;
    // Frequency: Single
    this.frequencySingleOption = page.getByRole('option', { name: 'SINGLE' });
    this.frequencyCombo = page.getByLabel(/PAYMENT FREQUENCY/);
    // From: CHECKING
    this.fromCheckingOption = page.getByRole('option', { name: /CHECKING \(\$\d+\.\d{2}\)/ });
    this.fromCombo = page.getByLabel(/Transfer From/);
    // To: SAVING
    this.toSavingOption = page.getByRole('option', { name: /SAVING \(\$\d+\.\d{2}\)/ }).last();
    this.toCombo = page.getByLabel(/Transfer To/);
    // Amount
    this.amountInput = page.getByRole('spinbutton', { name: /Amount/ });
    // Payment Date
    this.paymentDateInput = page.getByRole('textbox', { name: /Payment Date/ });
    // Scoped calendar trigger selector for Payment Date
    this.paymentDateCalendarBtn = page.locator('mat-card-content').getByRole('button', { name: /Open calendar/i });
    // Save button
    this.saveBtn = page.getByRole('button', { name: /^Save$/ });
  }

  async selectFrequencySingle() {
    await this.frequencyCombo.click();
    await this.frequencySingleOption.click();
  }

  async selectTransferFromChecking() {
    await this.fromCombo.click();
    await this.fromCheckingOption.click();
  }

  async selectTransferToSaving() {
    await this.toCombo.click();
    await this.toSavingOption.click();
  }

  async fillAmount(value) {
    await this.amountInput.fill(''); // Clear first
    await this.amountInput.type(value);
  }

  async fillPaymentDate(dateString) {
    const [month, day, year] = dateString.split('/').map(str => str.trim());
    await this.paymentDateCalendarBtn.click();
    const candidateBtn = this.page.getByRole('button', { name: new RegExp(`^${dateString}`) });
    if (await candidateBtn.isVisible({ timeout: 1000 })) {
      await candidateBtn.click();
    } else {
      const dayBtn = this.page.getByRole('button', { name: new RegExp(`^${parseInt(day, 10)}$`) });
      if (await dayBtn.isVisible({ timeout: 2000 })) {
        await dayBtn.click();
      }
    }
  }

  async clickSave() {
    await this.saveBtn.click();
  }
}

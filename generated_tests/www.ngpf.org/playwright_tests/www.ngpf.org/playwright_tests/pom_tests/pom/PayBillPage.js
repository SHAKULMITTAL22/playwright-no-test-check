import { BasePage } from './BasePage.js';

export class PayBillPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors
    this.paymentFrequencySelect = page.getByRole('combobox', { name: 'Payment Frequency' });
    // Alternate selectors for paymentFrequencySelect:
    // page.locator('mat-select.mat-select-required')
    // page.locator('.mat-select-required')
    // page.locator('[role="combobox"].mat-select-required')
    // page.locator('mat-select.mat-select.ng-tns-c100-28')
    // page.locator('mat-select.mat-select')

    this.singleFrequencyOption = page.getByRole('option', { name: 'SINGLE' });
    // Alternate selectors for singleFrequencyOption:
    // page.locator('[role="listbox"]').getByRole('option', { name: 'SINGLE' })
    // page.locator('[role="listbox"]').getByRole('option', { name: 'SINGLE' })
    // page.locator('[role="listbox"]').getByText('SINGLE')
    // page.locator('[role="listbox"]').getByText('SINGLE')
    // page.getByRole('option', { name: 'SINGLE' })

    this.recipientSelect = page.getByRole('combobox', { name: 'Recipient' });
    // Alternate selectors for recipientSelect:
    // page.locator('mat-select.mat-select-required')
    // page.locator('.mat-select-required')
    // page.locator('[role="combobox"].mat-select-required')
    // page.locator('mat-select.mat-select.ng-tns-c100-30')
    // page.locator('mat-select.mat-select')

    this.johnDoeRecipientOption = page.getByRole('option', { name: 'John Doe' });
    // Alternate selectors for johnDoeRecipientOption:
    // page.locator('[role="listbox"]').getByRole('option', { name: 'John Doe' })
    // page.locator('[role="listbox"]').getByRole('option', { name: 'John Doe' })
    // page.locator('[role="listbox"]').getByText('John Doe')
    // page.locator('[role="listbox"]').getByText('John Doe')
    // page.getByRole('option', { name: /John Doe/ })

    this.amountInput = page.getByRole('textbox', { name: 'Amount' });
    // Alternate selectors for amountInput:
    // page.locator('form[action*="pay-bill"]').getByRole('textbox', { name: /Amount \*/ })
    // page.getByRole('textbox', { name: /Amount \*/ })
    // page.getByLabel('Amount *')
    // page.getByLabel('Amount *')
    // page.locator('input[data-placeholder="Enter amount"]')

    this.submitBtn = page.getByRole('button', { name: 'SUBMIT' });
    // Alternate selectors for submitBtn:
    // page.locator('form[action*="pay-bill"]').getByRole('button', { name: 'SUBMIT' })
    // page.getByRole('button', { name: 'SUBMIT' })
    // page.getByText('SUBMIT')
    // page.locator('button.mat-focus-indicator.button')
    // page.locator('button.mat-focus-indicator')
  }

  async selectPaymentFrequency(frequency) {
    await this.paymentFrequencySelect.click({ timeout: 30000 });
    await this.page.getByRole('option', { name: frequency }).click({ timeout: 30000 });
    return this;
  }

  async selectRecipient(recipient) {
    await this.recipientSelect.click({ timeout: 30000 });
    await this.page.getByRole('option', { name: recipient }).click({ timeout: 30000 });
    return this;
  }

  async fillAmount(amount) {
    await this.amountInput.click({ timeout: 30000 });
    await this.amountInput.pressSequentially(amount, { delay: 50 });
    return this;
  }

  async clickSubmit() {
    await this.submitBtn.click({ timeout: 30000 });
    return this;
  }
}

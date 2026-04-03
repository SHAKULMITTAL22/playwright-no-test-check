import 'dotenv/config';
import { test, expect } from '@playwright/test';

const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://www.ngpf.org';
const BASE_URL = process.env.BASE_URL || 'https://www.ngpf.org/bank-sim/home';

let stepTimeout30 = { timeout: 30000 };

test('e2e_-_successful_money_transfer', async ({ page }) => {
  // Step 1: Navigate to homepage
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/.*bank-sim\/home/);

  // Step 2: Click GET STARTED NOW
  await page.getByRole('button', { name: 'GET STARTED NOW' }).click(stepTimeout30);
  await page.waitForURL('**/bank-sim/', stepTimeout30);

  // Dismiss Welcome Modal if present
  const okButton = page.getByRole('button', { name: 'Ok' });
  if (await okButton.isVisible()) {
    await okButton.click();
  }

  // Step 3: Expand Transfers menu and Click MAKE A TRANSFER
  await page.getByText('TRANSFERS', { exact: true }).click(stepTimeout30);
  await page.locator('a').filter({ hasText: 'MAKE A TRANSFER' }).click(stepTimeout30);
  await page.waitForURL('**/bank-sim/transfer', stepTimeout30);

  // Step 4: Input 50.00
  const amountInput = page.getByRole('spinbutton', { name: 'Amount' });
  await expect(amountInput).toBeVisible();
  await amountInput.fill('50.00');
  await expect(amountInput).toHaveValue('50.00');
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshotPath = testInfo.outputPath('failure.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
  }
});
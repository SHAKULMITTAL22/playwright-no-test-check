import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { DashboardPage } from './pom/DashboardPage.js';
import { PayBillPage } from './pom/PayBillPage.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.ngpf.org/bank-sim/home';
const BASE_HOST_URL = 'https://www.ngpf.org';

test('Discovered Workflow: e2e_business_workflow - Complete User Journey', { tag: ['@smoke'] }, async ({ page }) => {
  const homePage = new HomePage(page);
  const dashboardPage = new DashboardPage(page);
  const payBillPage = new PayBillPage(page);

  // Step 1: Navigate to homepage
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

  // Step 2: Start simulation
  await homePage.clickGetStarted();
  // Wait for the welcome modal to appear instead of strict URL check
  await expect(dashboardPage.okBtn).toBeVisible({ timeout: 10000 });

  // Step 3: Dismiss welcome modal
  await dashboardPage.dismissWelcomeModal();

  // Step 4 & 5: Navigate to Pay Bill
  await dashboardPage.navigateToPayBill();
  await page.waitForURL('**/pay-bill');

  // Step 6: Set Payment Frequency
  await payBillPage.selectPaymentFrequency();

  // Step 7: Add New Recipient
  await payBillPage.clickAddRecipient();

  // Step 8: Populate Recipient Details
  await payBillPage.fillRecipientName('Test Recipient');

  // Step 9: Submit Recipient
  await payBillPage.submitRecipient();

  // Step 10: Final Payment Submission
  await payBillPage.fillAmount('50');
  
  // Verify final navigation
  await page.waitForURL('**/bank-sim/pay-bill/display-bills');
});

test.afterEach(async ({ page, context }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      const accessibilityTree = await page.accessibility.snapshot();
      const fileName = path.basename(testInfo.file).replace('.spec.js', '');
      const stateFile = path.join(__dirname, `.accessibility_state_${fileName}.json`);
      fs.writeFileSync(stateFile, JSON.stringify({
        accessibility_tree: accessibilityTree,
        url: page.url(),
        all_page_urls: context.pages().map(p => p.url())
      }, null, 2));
    } catch (e) { /* Silent fail */ }
  }
});
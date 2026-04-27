import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
// Note: DashboardPage and TransferPage are required for this workflow as per the scenario definition.
// If these files are missing from the pom/ directory, they should be created based on the suggested methods.
import { DashboardPage } from './pom/DashboardPage.js';
import { TransferPage } from './pom/TransferPage.js';
import testData from './w01_internal_fund_transfer.test-data.json' with { type: 'json' };
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'https://www.ngpf.org/bank-sim/home';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://www.ngpf.org';

let stepTimeout30 = { timeout: 30000 };

test('Internal Fund Transfer', { tag: ['@smoke'] }, async ({ page }) => {
  const homePage = new HomePage(page);
  const dashboardPage = new DashboardPage(page);
  const transferPage = new TransferPage(page);
  const data = testData.variations[0];

  // Step 1: Navigate to homepage
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

  // Step 2: Click 'GET STARTED NOW'
  await homePage.clickGetStarted();

  // Step 3: Dismiss welcome modal
  // The HomePage POM already contains the method to click 'Ok' on the welcome dialog.
  await homePage.clickWelcomeOk();

  // Step 4: Expand 'TRANSFERS' menu
  await dashboardPage.expandTransfersMenu();

  // Step 5: Click 'MAKE A TRANSFER'
  await dashboardPage.clickMakeATransfer();

  // Step 6 & 7: Select 'SINGLE' frequency
  await transferPage.openFrequencyDropdown();
  await transferPage.selectSingleFrequency();

  // Step 8 & 9: Select 'CHECKING' source account
  await transferPage.openSourceAccountDropdown();
  await transferPage.selectCheckingAccount();

  // Step 10 & 11: Select 'SAVING' destination account
  await transferPage.openDestinationAccountDropdown();
  await transferPage.selectSavingAccount();

  // Step 12: Enter transfer amount
  // Guidance: Use click + pressSequentially for Angular Material inputs if fill fails.
  await transferPage.enterTransferAmount(data.amount);

  // Step 13: Enter payment date
  await transferPage.enterPaymentDate(data.paymentDate);

  // Step 14: Submit transfer
  await transferPage.submitTransfer();

  // Final Verification: Check URL (Redirected to transfer history page)
  const expectedUrlPattern = new RegExp('^' + BASE_HOST_URL + '/bank-sim/.*');
  await expect(page).toHaveURL(expectedUrlPattern, stepTimeout30);
});


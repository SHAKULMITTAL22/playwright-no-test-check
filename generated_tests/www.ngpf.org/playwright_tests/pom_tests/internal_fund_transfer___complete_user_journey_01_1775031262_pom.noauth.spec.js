import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { DashboardPage } from './pom/DashboardPage.js';
import { TransferPage } from './pom/TransferPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.ngpf.org/bank-sim/home';
const BASE_HOST_URL = 'https://www.ngpf.org';

test('Internal Fund Transfer - Complete User Journey', { tag: ['@smoke'] }, async ({ page }) => {
  const homePage = new HomePage(page);
  const dashboardPage = new DashboardPage(page);
  const transferPage = new TransferPage(page);

  // Step 1: Navigate to homepage
  await homePage.navigate(BASE_URL);

  // Step 2: Start simulation
  await homePage.clickGetStarted();
  await page.waitForURL(new RegExp('^' + BASE_HOST_URL + '/bank-sim/.*$'));

  // Step 3: Dismiss welcome modal
  await dashboardPage.dismissWelcomeModal();

  // Step 4 & 5: Navigate to transfer page
  await dashboardPage.navigateToTransfers();
  await page.waitForURL(new RegExp('^' + BASE_HOST_URL + '/bank-sim/transfer$'));

  // Step 6: Set frequency to SINGLE
  await transferPage.selectFrequency('SINGLE');

  // Step 7: Select CHECKING
  await transferPage.selectFromAccount('CHECKING');

  // Step 8: Select SAVING
  await transferPage.selectToAccount('SAVING');

  // Step 9: Enter amount
  await transferPage.enterAmount('50.00');

  // Step 10: Execute transfer
  await transferPage.clickSave();
  await page.waitForURL(new RegExp('^' + BASE_HOST_URL + '/bank-sim/transfer/display-transfers$'));
});


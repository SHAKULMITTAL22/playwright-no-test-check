import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { LandingPage } from './pom/LandingPage.js';
import { DashboardPage } from './pom/DashboardPage.js';
import { DepositCheckPage } from './pom/DepositCheckPage.js';
import { AccountActivityPage } from './pom/AccountActivityPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_HOST_URL = process.env.BASE_HOST_URL;
const BASE_URL = process.env.BASE_URL;

let stepTimeout30 = { timeout: 30000 };

test('Check Deposit Workflow - Complete User Journey', { tag: ['@smoke'] }, async ({ page }) => {
  // Step 1: Navigate to NGPF Bank Simulator
  await page.goto(BASE_URL || BASE_HOST_URL, { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(new RegExp(BASE_HOST_URL + '.*'));
  
  const landingPage = new LandingPage(page);
  const dashboardPage = new DashboardPage(page);
  const depositCheckPage = new DepositCheckPage(page);
  const accountActivityPage = new AccountActivityPage(page);
  
  // Step 2: Click GET STARTED NOW button
  await landingPage.clickGetStarted();
  await expect(page).toHaveURL(new RegExp(BASE_HOST_URL + '/bank-sim/home'));
  
  // Step 3: Dismiss welcome modal
  await dashboardPage.dismissWelcomeModal();
  await expect(page).toHaveURL(new RegExp(BASE_HOST_URL + '/bank-sim/'));
  
  // Step 4: Click DEPOSIT CHECKS in sidebar
  await dashboardPage.navigateToDepositChecks();
  await expect(page).toHaveURL(new RegExp(BASE_HOST_URL + '/bank-sim/deposit-check'));
  
  // Step 5: Click To account dropdown
  await depositCheckPage.openAccountDropdown();
  
  // Step 6: Select CHECKING account
  await depositCheckPage.selectCheckingAccount();
  
  // Step 7: Enter deposit amount
  await depositCheckPage.enterDepositAmount('100.00');
  
  // Step 8: Upload front check image
  await depositCheckPage.clickFrontUpload();
  
  // Step 9: Close front check modal
  await depositCheckPage.closeFrontModal();
  
  // Step 10: Upload back check image
  await depositCheckPage.clickBackUpload();
  
  // Step 11: Close back check modal
  await depositCheckPage.closeBackModal();
  
  // Step 12: Submit check deposit
  await depositCheckPage.submitDeposit();
  
  // Step 13: Navigate to Account Activity
  await accountActivityPage.navigateToAccounts();
  await expect(page).toHaveURL(new RegExp(BASE_HOST_URL + '/bank-sim/account'));
  
  // Step 14: Verify deposit transaction
  await accountActivityPage.verifyDepositRecord();
});

// Capture accessibility tree on failure for debugging

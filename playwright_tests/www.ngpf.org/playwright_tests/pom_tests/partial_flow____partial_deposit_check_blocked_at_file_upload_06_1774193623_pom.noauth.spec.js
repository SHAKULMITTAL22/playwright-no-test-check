// @ts-check
import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { AccountSidebar } from './pom/AccountSidebar.js';
import { DepositCheckPage } from './pom/DepositCheckPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://www.ngpf.org';
const BASE_URL = process.env.BASE_URL || 'https://www.ngpf.org/bank-sim';
let stepTimeout30 = { timeout: 30000 };

// One test block for the partial deposit workflow
// Tag: ['@smoke'] (main workflow up to upload block)
test(
  'Discovered Workflow: partial_flow -- Partial: Deposit Check Blocked at File Upload',
  { tag: ['@smoke'] },
  async ({ page }) => {
    // Step 1: Navigate to homepage
    const homePage = new HomePage(page);
    await homePage.navigateHome();
    // Accept both /bank-sim and redirected /bank-sim/home?returnUrl=%2F
    await expect(page).toHaveURL(new RegExp(BASE_URL + '($|/home\\?returnUrl=)'), stepTimeout30); // Accepts both possible entry points

    // Step 2: Click GET STARTED NOW
    await homePage.clickGetStartedNow();
    await homePage.waitForUrl(new RegExp(BASE_URL + '/home.*'), 20000);

    // Step 3: Click Ok in onboarding dialog
    await homePage.clickWelcomeOk(); // Onboarding modal Ok
    await homePage.waitForUrl(new RegExp(BASE_URL + '/'), 20000);

    // Step 4: Click DEPOSIT CHECKS in sidebar
    const sidebar = new AccountSidebar(page);
    await sidebar.navigateDepositChecks();
    await homePage.waitForUrl(new RegExp(BASE_URL + '/deposit-check'), 20000);

    // Step 5: Expand 'To' account dropdown
    const depositPage = new DepositCheckPage(page);
    await depositPage.openAccountDropdown();

    // Step 6: Select 'CHECKING' account option
    await depositPage.selectCheckingAccount();

    // Step 7: Fill amount input (simulate $100.00 as per scenario)
    await depositPage.fillDepositAmount('100.00');

    // Step 8: Click 'Front' upload button (simulate upload modal, DO NOT upload a file)
    await depositPage.clickFrontUpload();
    // At this point, file dialog will appear and automation is BLOCKED per instructions.
    // Assert that workflow is blocked for file upload automation.
    // Deposit is NOT completed, confirmation/account update is NOT possible without actual upload.
    
    // Optionally assert URL remains on deposit-check page
    await expect(page).toHaveURL(new RegExp(BASE_URL + '/deposit-check.*'), stepTimeout30);
  }
);


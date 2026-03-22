import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { SidebarMenu } from './pom/SidebarMenu.js';
import { MakeTransferPage } from './pom/MakeTransferPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://www.ngpf.org';
const BASE_URL = process.env.BASE_URL || 'https://www.ngpf.org/bank-sim';

let stepTimeout30 = { timeout: 30000 };

// There is only one primary scenario (happy path)---see prompt description.
test(
  'Submit a Single Transfer Between Accounts',
  { tag: ['@smoke'] },
  async ({ page }) => {
    // 1. Go to main simulator landing
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    // 2. GET STARTED NOW if present (may be on own landing page)
    const homePage = new HomePage(page);
    await homePage.clickGetStartedNow();

    // 3. Welcome modal Ok
    await homePage.clickWelcomeOk();

    // 4. Expand TRANSFERS in sidebar, then open Make a Transfer
    const sidebar = new SidebarMenu(page);
    await sidebar.expandTransfersMenu();
    await sidebar.clickMakeTransfer();

    // 5. Complete the Make a Transfer single workflow
    const makeTransferPage = new MakeTransferPage(page);
    await makeTransferPage.selectFrequencySingle();
    await makeTransferPage.selectTransferFromChecking();
    await makeTransferPage.selectTransferToSaving();
    
    // Amount: must select a valid amount. No UI_AZURE_OPENAI_AMOUNT in user data, so value will be hardcoded---use minimal valid (e.g. '10.00')
    await makeTransferPage.fillAmount('10.00');
    // Payment Date: set to current date in MM/DD/YYYY as in scenario JSON (e.g., 3/22/2026), keep as '3/22/2026' for reproducibility
    await makeTransferPage.fillPaymentDate('3/22/2026');
    // Save/submit
    await makeTransferPage.clickSave();
    // Post: The scenario does not specify dialog or confirmation---do not over-verify.
  }
);


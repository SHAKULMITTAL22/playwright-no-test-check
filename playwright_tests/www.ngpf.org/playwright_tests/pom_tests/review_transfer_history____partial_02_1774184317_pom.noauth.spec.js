import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { SidebarPage } from './pom/SidebarPage.js';
import { TransferHistoryPage } from './pom/TransferHistoryPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL;
const BASE_HOST_URL = process.env.BASE_HOST_URL;
let stepTimeout30 = { timeout: 30000 };

test('Discovered Workflow: Review Transfer History -- Partial', { tag: ['@regression'] }, async ({ page }) => {
  // Step 1: Navigate to homepage
  await page.goto(BASE_URL || BASE_HOST_URL, { waitUntil: 'domcontentloaded' });
  // Accept both /bank-sim/, /bank-sim, and /bank-sim/home?returnUrl=%2F URLs
  const urlPattern = new RegExp(`${BASE_HOST_URL}/bank-sim(/(home\\?returnUrl=%2F)?)?/?$`);
  await expect(page).toHaveURL(urlPattern, stepTimeout30);

  // Step 2: Click 'GET STARTED NOW'
  const homePage = new HomePage(page);
  await homePage.clickGetStarted();
  // After click: Welcome modal appears (do not assert URL, it may already be at /home)
  await expect(page.getByRole('button', { name: 'Ok' })).toBeVisible(stepTimeout30);

  // Step 3: Dismiss 'Welcome' modal with Ok
  await homePage.dismissWelcomeModal();

  // Step 4: Expand 'TRANSFERS' section in sidebar
  const sidebarPage = new SidebarPage(page);
  await sidebarPage.expandTransfersSidebar();

  // Step 5: Click 'DISPLAY ALL TRANSFERS'
  await sidebarPage.viewAllTransfers();
  await expect(page).toHaveURL(BASE_HOST_URL + '/bank-sim/transfer/display-transfers', stepTimeout30);

  // Step 6: Verify transfer history table columns & empty state
  const transferHistoryPage = new TransferHistoryPage(page);
  // Headers: Id, Date, Description, Amount, Actions
  for (const header of transferHistoryPage.getTableHeaders()) {
    await expect(header).toBeVisible(stepTimeout30);
  }
  // No records cell: should display '0 of 0'
  const noRecordsCell = transferHistoryPage.getNoRecordsCell();
  await expect(noRecordsCell).toBeVisible(stepTimeout30);
});


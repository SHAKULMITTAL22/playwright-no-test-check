import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { DashboardPage } from './pom/DashboardPage.js';
import { TransferPage } from './pom/TransferPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_HOST_URL = 'https://www.ngpf.org';
const BASE_URL = 'https://www.ngpf.org/bank-sim/home';

test('Discovered Workflow: e2e_business_workflow - Complete User Journey', { tag: ['@smoke'] }, async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  const transferPage = new TransferPage(page);

  // Step 1: Navigate to homepage
  await dashboardPage.navigate(BASE_URL);

  // Step 2: Start simulation
  await dashboardPage.startSimulation();
  await expect(page).toHaveURL(/.*\/bank-sim\/.*/);

  // Step 3: Expand transfers menu
  await dashboardPage.expandTransfersMenu();

  // Step 4: Select Make a Transfer
  await transferPage.navigateToTransferForm();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/transfer');

  // Step 5: Submit transfer details
  // Updated frequency to 'SINGLE' and account to 'SAVING' to match UI options
  await transferPage.fillTransferForm('SINGLE', 'CHECKING', 'SAVING', '100');
  await transferPage.submitTransfer();
  await page.waitForURL('https://www.ngpf.org/bank-sim/transfer/display-transfers');
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/transfer/display-transfers');
});


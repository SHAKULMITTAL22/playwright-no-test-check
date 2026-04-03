import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { DashboardPage } from './pom/DashboardPage.js';
import { TransferPage } from './pom/TransferPage.js';

const BASE_URL = 'https://www.ngpf.org/bank-sim/home';
const BASE_HOST_URL = 'https://www.ngpf.org';

let stepTimeout30 = { timeout: 30000 };
let stepTimeout10 = { timeout: 10000 };

test('E2E - Successful Money Transfer', async ({ page }) => {
  
  await test.step('Navigate to homepage', async () => {
    const homePage = new HomePage(page);
    await homePage.navigate(BASE_URL);
    await homePage.waitForPageLoad();
  });

  await test.step('Initiate workflow from Home', async () => {
    const homePage = new HomePage(page);
    const dashboardPage = await homePage.clickGetStarted();
    await expect(page).toHaveURL(new RegExp(`${BASE_HOST_URL}/bank-sim/`), stepTimeout30);
  });

  await test.step('Navigate to Transfer page', async () => {
    const dashboardPage = new DashboardPage(page);
    const transferPage = await dashboardPage.navigateToTransfer();
    await expect(page).toHaveURL(new RegExp(`${BASE_HOST_URL}/bank-sim/transfer`), stepTimeout30);
  });

  await test.step('Input transfer amount', async () => {
    const transferPage = new TransferPage(page);
    const amount = '50';
    await transferPage.enterAmount(amount);
    
    // Verification of input value
    await expect(transferPage.amountInput).toHaveValue(amount, stepTimeout10);
  });
});
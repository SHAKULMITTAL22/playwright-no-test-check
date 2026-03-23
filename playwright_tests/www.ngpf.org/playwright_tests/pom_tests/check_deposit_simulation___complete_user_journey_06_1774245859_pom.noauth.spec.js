import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { DepositCheckPage } from './pom/DepositCheckPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.ngpf.org/bank-sim';
const BASE_HOST_URL = 'https://www.ngpf.org';

const stepTimeout30 = { timeout: 30000 };

test.describe('Check Deposit Simulation - Complete User Journey', () => {

  test(
    'Discovered Workflow: Check Deposit Simulation - Complete User Journey',
    { tag: ['@smoke'] },
    async ({ page }) => {
      const homePage = new HomePage(page);
      const depositCheckPage = new DepositCheckPage(page);

      // Step 1: Navigate to NGPF Bank Simulator homepage
      await homePage.navigateToSite(BASE_URL);

      // Step 2: Click GET STARTED NOW button
      await homePage.getStartedButton.waitFor({ state: 'visible', ...stepTimeout30 });
      await homePage.clickGetStarted();

      // Step 3: Dismiss the welcome modal by clicking Ok
      await homePage.dismissWelcomeModal();

      // Step 4: Navigate to DEPOSIT CHECKS via sidebar
      await depositCheckPage.depositCheckNavLink.waitFor({ state: 'visible', ...stepTimeout30 });
      await depositCheckPage.navigateToDepositChecks();

      // Verify navigation to deposit-check page
      await page.waitForURL('**/deposit-check', stepTimeout30);

      // Step 5: Open the To account dropdown
      await depositCheckPage.openAccountDropdown();

      // Step 6: Select CHECKING account
      await depositCheckPage.selectCheckingAccount();

      // Step 7: Enter deposit amount 100.00
      await depositCheckPage.enterDepositAmount('100.00');

      // Step 8: Submit the deposit form and wait for redirect to account activity
      await Promise.all([
        page.waitForURL('**/account', stepTimeout30),
        depositCheckPage.submitDepositForm(),
      ]);

      // Verify redirect to Account Activity page
      await expect(page).toHaveURL(new RegExp(BASE_HOST_URL + '/bank-sim/account'), stepTimeout30);

      // Step 9: Verify the new deposit record is visible in Account Activity
      await depositCheckPage.verifyDepositInAccountActivity();
    }
  );

});


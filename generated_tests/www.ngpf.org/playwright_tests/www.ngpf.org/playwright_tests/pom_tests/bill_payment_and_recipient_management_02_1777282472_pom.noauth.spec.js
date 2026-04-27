import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { ManageRecipientPage } from './pom/ManageRecipientPage.js';
import { PayBillPage } from './pom/PayBillPage.js';
import testData from './bill_payment_and_recipient_management_02_1777282472.test-data.json' with { type: 'json' };
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'https://www.ngpf.org/bank-sim/home';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://www.ngpf.org';

let stepTimeout30 = { timeout: 30000 };

test('Bill Payment and Recipient Management', { tag: ['@smoke'] }, async ({ page }) => {
  const homePage = new HomePage(page);
  const manageRecipientPage = new ManageRecipientPage(page);
  const payBillPage = new PayBillPage(page);
  const data = testData.variations[0];

  // Step 1: Navigate to the starting URL
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

  // Step 2: Click GET STARTED NOW
  await homePage.clickGetStarted();

  // Step 3: Click Ok on welcome dialog
  await homePage.clickWelcomeOk();

  // Step 4: Navigate to Manage Recipient
  await homePage.clickBillsMenu();
  await homePage.clickManageRecipientMenu();

  // Step 5: Add a recipient
  await manageRecipientPage.clickAddRecipient();
  await manageRecipientPage.fillRecipientName(data.recipientName);
  await manageRecipientPage.fillAddress(data.address);
  await manageRecipientPage.fillCity(data.city);
  await manageRecipientPage.clickSubmit();

  // Step 6: Navigate to Pay Bill
  await homePage.clickBillsMenu();
  await homePage.clickPayBillMenu();

  // Step 7: Pay the bill
  await payBillPage.selectPaymentFrequency('SINGLE');
  await payBillPage.selectRecipient(data.recipientName);
  await payBillPage.fillAmount(data.amount);
  await payBillPage.clickSubmit();

  // Final Verification: Check URL - Updated regex to allow for sub-paths like /display-bills
  const expectedUrlPattern = new RegExp('^' + BASE_HOST_URL + '/bank-sim/pay-bill');
  await expect(page).toHaveURL(expectedUrlPattern, stepTimeout30);
});


import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { BeginnersMortgagePage } from './pom/BeginnersMortgagePage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://mortgage.leumi.co.il';
const BASE_URL = process.env.BASE_URL || 'https://mortgage.leumi.co.il/';

let stepTimeout30 = { timeout: 30000 };

test('Discovered Workflow: Initiate Digital Mortgage Application - Complete User Journey', { tag: ['@smoke'] }, async ({ page }) => {
  const beginnersPage = new BeginnersMortgagePage(page);

  // Step 1: Navigate to Beginners Page
  await beginnersPage.navigateToBeginnersPage();

  // Step 2: Close Chat Popup (Conditional)
  try {
    // Wait briefly for the popup to appear
    await beginnersPage.closeChatPopupBtn.waitFor({ state: 'visible', timeout: 5000 });
    await beginnersPage.closeChatPopup();
  } catch (e) {
    // Popup did not appear or was already closed, proceed normally
    console.log('Chat popup did not appear within timeout, continuing...');
  }

  // Step 3: Click Start Application Button
  await beginnersPage.clickStartApplication();

  // Verify redirection to the minisite
  await expect(page).toHaveURL(/.*\/minisite\/mortgage.*/, stepTimeout30);
});

// Capture accessibility tree on failure for debugging


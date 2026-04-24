import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { MortgageHomePage } from './pom/MortgageHomePage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://mortgage.leumi.co.il';
const BASE_URL = process.env.BASE_URL || 'https://mortgage.leumi.co.il';

let stepTimeout30 = { timeout: 30000 };

test('Initiate Digital Mortgage Application -- Partial', { tag: ['@smoke'] }, async ({ page }) => {
  const mortgageHomePage = new MortgageHomePage(page);

  // Step 1: Navigate to homepage
  await mortgageHomePage.navigateToHomePage();

  // Step 2: Click Start Button
  await mortgageHomePage.clickStartApplication();

  // Verify the resulting URL (lands on /minisite/mortgage instead of the expected external app)
  await expect(page).toHaveURL(new RegExp(BASE_HOST_URL + '/minisite/mortgage.*'), stepTimeout30);
});

// Capture accessibility tree on failure for debugging


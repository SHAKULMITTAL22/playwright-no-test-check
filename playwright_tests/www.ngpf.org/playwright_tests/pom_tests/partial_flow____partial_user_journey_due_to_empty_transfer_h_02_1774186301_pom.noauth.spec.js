// partial_flow____partial_user_journey_due_to_empty_transfer_h_02_1774186301_pom.noauth.spec.js
import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { LandingPage } from './pom/LandingPage.js';
import { SimulatorPage } from './pom/SimulatorPage.js';
import { SidebarMenu } from './pom/SidebarMenu.js';
import { TransferHistoryPage } from './pom/TransferHistoryPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL;
const BASE_HOST_URL = process.env.BASE_HOST_URL;
let stepTimeout30 = { timeout: 30000 };

// Only one scenario: partial navigation to transfer history, verifying empty-state.
test(
  'Discovered Workflow: partial_flow -- Partial User Journey due to Empty Transfer History',
  { tag: ['@smoke'] },
  async ({ page }) => {
    // Step 1: Navigate to homepage
    await page.goto(BASE_URL || BASE_HOST_URL, { waitUntil: 'domcontentloaded' });
    // Accept the base /bank-sim or the redirect to /bank-sim/home?returnUrl=%2F
    const landingUrlPattern = new RegExp(
      BASE_HOST_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '/bank-sim($|/home\\?returnUrl=%2F$)'
    );
    await expect(page).toHaveURL(landingUrlPattern);

    // Step 2: Click 'GET STARTED NOW' (Landing)
    const landingPage = new LandingPage(page);
    await landingPage.clickGetStarted();
    await expect(page).toHaveURL(new RegExp(BASE_HOST_URL + '/bank-sim/home.*'));

    // Step 3: Dismiss welcome modal (Simulator)
    const simulatorPage = new SimulatorPage(page);
    await simulatorPage.dismissWelcomeModal();
    await expect(page).toHaveURL(new RegExp(BASE_HOST_URL + '/bank-sim.*'));

    // Step 4: Expand 'TRANSFERS' sidebar
    const sidebarMenu = new SidebarMenu(page);
    await sidebarMenu.expandTransfersMenu();
    // No explicit URL change

    // Step 5: Click 'DISPLAY ALL TRANSFERS' sidebar menu
    await sidebarMenu.clickDisplayAllTransfers();
    await expect(page).toHaveURL(BASE_HOST_URL + '/bank-sim/transfer/display-transfers');

    // Step 6: Validate both transfer tables empty ('0 of 0')
    const transferHistoryPage = new TransferHistoryPage(page);
    await transferHistoryPage.waitForTablesVisible();
    const isEmptyStateDisplayed = await transferHistoryPage.isEmptyStateDisplayed();
    expect(isEmptyStateDisplayed).toBe(true);
  }
);


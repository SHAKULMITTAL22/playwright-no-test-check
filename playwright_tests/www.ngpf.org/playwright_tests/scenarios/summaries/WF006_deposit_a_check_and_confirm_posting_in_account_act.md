# Scenario Summary: check_deposit_simulation_-_complete_user_journey_06_1774245859

## Overview

- **Workflow ID**: WF006
- **Title**: Deposit a Check and Confirm Posting in Account Activity
- **Goal**: Simulate check deposit by entering amount, selecting account, uploading required images, and confirming deposit. Success: user receives confirmation message and a new deposit record is visible in Account Activity.
- **Feature Area**: Check Deposit Simulation
- **Site URL**: https://www.ngpf.org/bank-sim
- **Site Type**: dashboard — Educational banking simulator for personal finance literacy
- **Confidence Score**: 0.97
- **Auth Required**: False
- **Generated On**: 2026-03-23T11:34:19.269194

## User Journeys

### 1. Check Deposit and Account Activity Verification
_User navigates through the bank simulator to deposit a check, fills in account and amount fields, submits the form, receives a confirmation message, and verifies the new transaction appears in Account Activity._

- **Business Value**: Teaches students how check deposits work in a real banking context — reinforcing financial literacy through simulated transaction flows.
- **User Persona**: Student or educator using NGPF bank simulator for personal finance training
- **Frequency**: weekly
- **Complexity**: medium

## Scenarios

### 1. Discovered Workflow: Check Deposit Simulation - Complete User Journey
**Type**: e2e_business_workflow | **Priority**: high

> End-to-end test verifying that a user can land on the NGPF Bank Simulator, dismiss the welcome modal, navigate to Deposit Checks, select the CHECKING account, enter a deposit amount of $100.00, submit the form without image uploads (simulator accepts submission without them), receive a green confirmation toast, and confirm the new deposit record is visible in Account Activity.

**Business Goal**: Verify that users can complete a simulated check deposit, receive confirmation, and see the resulting transaction in Account Activity

**User Story**: As a student using the NGPF Bank Simulator, I want to deposit a check into my checking account so that I can practice real-world banking workflows and see how transactions are recorded in account activity.

**Workflow Narrative**:
A student opens the NGPF Bank Simulator at https://www.ngpf.org/bank-sim. After clicking 'GET STARTED NOW' on the welcome screen, a modal greets them — they dismiss it with 'Ok'. From the sidebar, they navigate to 'DEPOSIT CHECKS'. On the deposit form, they select 'CHECKING' as the destination account and enter $100.00 as the check amount. Notably, the simulator does not require actual check image uploads — clicking 'Submit' processes the deposit directly. The user receives a green toast confirmation: 'You have successfully deposited your check.' The app then redirects to Account Activity (https://www.ngpf.org/bank-sim/account) where the new deposit row — ID 1200044, Date 03/23/2026, Description 'Deposit Check To Checking Account', Amount $100.00, Balance $316.04 — is visible.

#### Implementation Guidance:
- Use `waitUntil: 'domcontentloaded'` on initial navigation; the app redirects to /bank-sim/home?returnUrl=%2F before settling at /bank-sim/.
- After clicking 'GET STARTED NOW', wait for the welcome dialog to appear before attempting to click 'Ok' — use `page.waitForSelector('[role="dialog"]')` or `page.getByRole('button', { name: 'Ok' }).waitFor()`.
- The 'To' account dropdown is a Angular Material `mat-select` (combobox). After clicking it, wait for the listbox overlay to render before clicking the option: `page.getByRole('option', { name: 'CHECKING (Available Balance' }).waitFor()`.
- The Amount input is inside a `mat-form-field`. Use `fill('100.00')` or `pressSequentially('100.00')` on the textbox. Ensure the field is cleared before typing.
- No file uploads are required — the simulator accepts submission without check images. Do not attempt to interact with Front/Back upload buttons.
- After clicking Submit, the app navigates to `https://www.ngpf.org/bank-sim/account`. Use `page.waitForURL('**/account')` to confirm redirect.
- The success toast ('You have successfully deposited your check.') may disappear quickly — assert its presence immediately after submit using `page.waitForSelector` with a short timeout, or capture it before navigation completes.
- Verify the new deposit row in Account Activity by asserting visible text such as 'Deposit Check To Checking Account' and '$100.00' on the /account page.
- The sidebar navigation link is inside an Angular `app-menu-list-item` component — use `page.locator('a').filter({ hasText: 'DEPOSIT CHECKS' })` for reliable targeting.
- All Angular Material components (mat-select, mat-option, mat-dialog) are rendered in portal overlays — selectors targeting `[role="listbox"]` or `[role="dialog"]` will be needed for robust scoping.

#### Detailed Steps:

| # | Action | Component | Description | Verification | URL |
|---|--------|-----------|-------------|--------------|-----|
| 1 | Navigate to NGPF Bank Simulator homepage | Navigation | Load the NGPF Bank Simulator landing page. The app redirects to /bank-sim/home?returnUrl=%2F. | Page loads and 'GET STARTED NOW' button is visible | https://www.ngpf.org/bank-sim |
| 2 | Click 'GET STARTED NOW' button | Welcome Page | Click the primary CTA button on the welcome screen to enter the bank simulator. This triggers a redirect to the main dashboard and opens a welcome modal. | Welcome dialog/modal becomes visible with an 'Ok' button | https://www.ngpf.org/bank-sim/ |
| 3 | Click 'Ok' to dismiss the welcome modal | Welcome Modal | Dismiss the welcome dialog that appears after entering the simulator. Wait for the dialog to be visible before clicking. | Welcome modal closes and the main dashboard with sidebar is visible | https://www.ngpf.org/bank-sim/ |
| 4 | Click 'DEPOSIT CHECKS' in the sidebar navigation | Sidebar Navigation | Navigate to the Deposit Checks feature by clicking its link in the left sidebar. This routes to /bank-sim/deposit-check. | Deposit Checks form page is loaded with 'To', 'Amount', 'Front', 'Back', 'Submit', and 'Cancel' elements visible | https://www.ngpf.org/bank-sim/deposit-check |
| 5 | Click the 'To' account dropdown to open account options | To Account Dropdown | Click the Angular Material mat-select combobox to open the account selection listbox. The dropdown will show available accounts. | Account options listbox is visible, showing 'CHECKING' and 'SAVING' options | https://www.ngpf.org/bank-sim/deposit-check |
| 6 | Select 'CHECKING' account from the dropdown options | To Account Dropdown | Click the 'CHECKING (Available Balance is $216.04)' option from the open listbox overlay. Wait for the listbox to be visible before clicking. | Dropdown closes and 'CHECKING (Available Balance is $216.04)' is displayed as the selected value in the 'To' field | https://www.ngpf.org/bank-sim/deposit-check |
| 7 | Enter deposit amount '100.00' in the Amount field | Deposit Check Form | Type '100.00' into the Amount text input. The field is inside an Angular Material mat-form-field. Clear the field before typing to ensure no stale value. | Amount field displays '100.00' | https://www.ngpf.org/bank-sim/deposit-check |
| 8 | Click the 'Submit' button to submit the deposit form | Deposit Check Form | Click the Submit button to process the check deposit. Note: the simulator does NOT require Front/Back check image uploads — the form submits successfully with only the account and amount fields filled. After clicking, the app redirects to /bank-sim/account. | App redirects to /bank-sim/account AND a green success toast notification 'You have successfully deposited your check.' appears | https://www.ngpf.org/bank-sim/account |
| 9 | Verify redirect to Account Activity page and presence of new deposit record | Account Activity Page | After submission, confirm the app has navigated to /bank-sim/account. Verify the new deposit record is present: Description 'Deposit Check To Checking Account', Amount $100.00, and updated Balance $316.04. | URL is /bank-sim/account AND the account activity table/list contains 'Deposit Check To Checking Account' with amount '$100.00' and balance '$316.04' | https://www.ngpf.org/bank-sim/account |

#### Expected Results:
- User successfully navigates from the welcome page through to the Deposit Checks form
- CHECKING account is selectable and shown with its available balance
- Form accepts $100.00 as a valid deposit amount without requiring check image uploads
- Clicking Submit processes the deposit and redirects to Account Activity
- A green success toast notification 'You have successfully deposited your check.' is displayed
- Account Activity shows a new row: Description 'Deposit Check To Checking Account', Amount $100.00
- Account balance updates from $216.04 to $316.04 reflecting the $100.00 deposit

#### Edge Cases:
- Submit button behavior when only account is selected but amount is empty (expect validation error)
- Submit button behavior when only amount is entered but no account is selected (expect validation error)
- Entering a negative or zero amount in the Amount field
- Entering a non-numeric value in the Amount field
- Selecting the SAVING account instead of CHECKING and verifying the correct account is credited
- Rapid double-click on Submit to check for duplicate transaction prevention
- Slow network simulation — verify the form does not allow re-submission while processing
- Welcome modal behavior on page refresh — verify it re-appears or is suppressed based on session state
- Navigation away from the deposit form mid-fill via the Cancel button — verify no transaction is created

#### Data Requirements:
- Active bank simulator session (no real credentials required — simulator is publicly accessible)
- Default CHECKING account with initial balance of $216.04
- Deposit amount: 100.00 (exact value verified in agent execution)
- No check image files required — simulator accepts form submission without uploads

#### Prerequisites:
- https://www.ngpf.org/bank-sim is accessible and the Angular app loads successfully
- The simulator initializes with a CHECKING account balance of $216.04 and SAVING account balance of $230.00
- No prior test has altered the account state in the same session (or the simulator resets per session)
- JavaScript is enabled in the browser (Angular Material requires JS)
- No network-level blocking of the NGPF domain

## Captured Selectors

- **Total**: 21

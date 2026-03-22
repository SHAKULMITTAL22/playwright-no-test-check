# Scenario Summary: e2e_business_workflow_-_complete_user_journey_01_1774193936

## Overview

- **Workflow ID**: WF001
- **Title**: Submit a Single Transfer Between Accounts
- **Goal**: Successfully transfer funds between Checking and Saving accounts using the Make a Transfer form. Ensure confirmation and correct entry in transfer history.
- **Feature Area**: Transfer Funds Workflow
- **Site URL**: https://www.ngpf.org/bank-sim
- **Site Type**: saas — Financial education and banking simulator
- **Confidence Score**: 0.95
- **Auth Required**: False
- **Generated On**: 2026-03-22T21:08:56.574781

## User Journeys

### 1. Primary Business Workflow
_Main user flow for transferring funds between accounts_

- **Business Value**: Verifies the key scenario of transferring funds and recording it in transaction history
- **User Persona**: Student, financial literacy learner
- **Frequency**: daily
- **Complexity**: medium

## Scenarios

### 1. Discovered Workflow: e2e_business_workflow - Complete User Journey
**Type**: e2e_business_workflow | **Priority**: high

> Comprehensive test covering the user's journey to transfer funds between Checking and Saving accounts, and verification in transfer history.

**Business Goal**: Verify users can complete the workflow for a single transfer and see it recorded in history.

**User Story**: As a student, I want to transfer funds from my Checking to my Saving account using the simulator so that I can track my transactions accurately.

**Workflow Narrative**:
A student logs into the NGPF Bank Simulator, dismisses the onboarding modal, expands the sidebar, navigates to the transfer form, and completes a transfer from Checking to Saving. The workflow includes entering all details and verifying confirmation as well as the transfer history entry.

#### Implementation Guidance:
- Use waitForSelector on modals and snackbars for confirmation.
- Use the 'all_selectors' array for robust locator fallback.
- Respect Shadow DOM parents where 'web_component_parent' is given (use pressSequentially)
- Validate transfer history post-submit for business result.
- Each input field and dropdown interaction requires selector capture step as shown.

#### Detailed Steps:

| # | Action | Component | Description | Verification | URL |
|---|--------|-----------|-------------|--------------|-----|
| 1 | Navigate to homepage | Navigation | Load homepage | Page loaded | https://www.ngpf.org/bank-sim |
| 2 | Click GET STARTED NOW | Landing - Get Started Button | Begin onboarding and access dashboard | Onboarding modal appears | https://www.ngpf.org/bank-sim/home?returnUrl=%2F |
| 3 | Click Ok on onboarding modal | Onboarding Modal | Dismiss modal to permit interaction | Sidebar available | https://www.ngpf.org/bank-sim/ |
| 4 | Expand TRANSFERS sidebar | Transfers Sidebar Expand | Show transfer menu options | TRANSFER menu expanded | https://www.ngpf.org/bank-sim/ |
| 5 | Click MAKE A TRANSFER | Sidebar Menu - Transfers | Open transfer form | Transfer form visible | https://www.ngpf.org/bank-sim/transfer |
| 6 | Open PAYMENT FREQUENCY dropdown | PAYMENT FREQUENCY | Expand payment frequency options | Dropdown with SINGLE and MONTHLY visible | https://www.ngpf.org/bank-sim/transfer |
| 7 | Select SINGLE in PAYMENT FREQUENCY | PAYMENT FREQUENCY Dropdown Option | Set transfer to single occurrence | Dropdown option SINGLE selected | https://www.ngpf.org/bank-sim/transfer |
| 8 | Open Transfer From dropdown | Transfer From Dropdown | Expand source account dropdown | Source account options visible | https://www.ngpf.org/bank-sim/transfer |
| 9 | Select CHECKING ($216.04) in Transfer From | Transfer From Dropdown Option | Choose Checking account as source | Checking account selected | https://www.ngpf.org/bank-sim/transfer |
| 10 | Open Transfer To dropdown | Transfer To Dropdown | Expand receiving account dropdown | Receiving account options visible | https://www.ngpf.org/bank-sim/transfer |
| 11 | Select SAVING ($230.00) in Transfer To | Transfer To Dropdown Option | Choose Saving as destination | Saving account selected | https://www.ngpf.org/bank-sim/transfer |
| 12 | Type transfer Amount ('50') | Amount Input | Enter transfer value | Amount field populated | https://www.ngpf.org/bank-sim/transfer |
| 13 | Input Payment Date ('3/22/2026') | Payment Date Field | Enter or confirm transfer date | Payment Date field populated with 3/22/2026 | https://www.ngpf.org/bank-sim/transfer |
| 14 | Click Save button to submit transfer | Transfer Form | Submit the transfer | Snackbar confirmation and transfer in past history | https://www.ngpf.org/bank-sim/transfer/display-transfers |
| 15 | Verify confirmation and transfer history | Confirmation Snackbar & Past Transfers Table | Check for snackbar success and new transfer entry | Snackbar: 'Amount has been transferred to Saving Account'; Past Transfers entry with Id 1100002, Date 03/22/2026, Description 'Transfer to Saving Account', Amount '-$50.00' | https://www.ngpf.org/bank-sim/transfer/display-transfers |

#### Expected Results:
- User completes workflow end-to-end
- Confirmation snackbar appears
- Transfer is visible in transaction history
- No errors encountered

#### Edge Cases:
- Slow network (modal or snackbar timing out)
- Modal dismissed unexpectedly
- Account dropdown options unavailable
- Attempting transfer with insufficient funds

#### Data Requirements:
- Test accounts with sufficient funds
- Valid input values: PAYMENT FREQUENCY (SINGLE), Transfer From (CHECKING $216.04), Transfer To (SAVING $230.00), Amount (50), Payment Date (3/22/2026)

#### Prerequisites:
- Site is accessible and responsive
- Accounts exist and are visible in dropdowns

## Captured Selectors

- **Total**: 38

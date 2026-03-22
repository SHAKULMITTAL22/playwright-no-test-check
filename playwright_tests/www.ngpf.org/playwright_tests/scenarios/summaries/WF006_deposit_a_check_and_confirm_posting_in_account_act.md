# Scenario Summary: e2e_business_workflow_-_complete_user_journey_03_1774192414

## Overview

- **Workflow ID**: WF006
- **Title**: Deposit a Check and Confirm Posting in Account Activity
- **Goal**: Simulate check deposit by entering amount, selecting account, uploading required images, and confirming deposit. Success: user receives confirmation message and a new deposit record is visible in Account Activity.
- **Feature Area**: Check Deposit Simulation
- **Site URL**: https://www.ngpf.org/bank-sim
- **Site Type**: dashboard — Personal finance simulation and education portal
- **Confidence Score**: 0.95
- **Auth Required**: False
- **Generated On**: 2026-03-22T20:43:34.613563

## User Journeys

### 1. Primary Business Workflow
_Main user flow for depositing a check and verifying account posting._

- **Business Value**: Ensures users can simulate real-world check deposit activities, reinforcing financial literacy.
- **User Persona**: Student or participant in a personal finance course
- **Frequency**: daily
- **Complexity**: medium

## Scenarios

### 1. Discovered Workflow: e2e_business_workflow - Complete User Journey
**Type**: e2e_business_workflow | **Priority**: high

> Comprehensive test covering the deposit check simulation end to end: from initial navigation, through deposit form completion, required image uploads, to confirmation and activity check.

**Business Goal**: Verify users can complete a check deposit simulation and confirm posting in account activity.

**User Story**: As a student user, I want to practice depositing a check so that I can see how funds are posted and tracked in my simulated account.

**Workflow Narrative**:
A user navigates to the NGPF Bank Simulator to practice depositing a check. They walk through the main dashboard, select the 'Deposit Checks' menu, choose the correct account, input the deposit amount, upload both front and back check images, and successfully submit the deposit. Confirmation via on-screen banner and transaction record in Account Activity completes the journey.

#### Implementation Guidance:
- Use waitForSelector to handle modals and menu transitions.
- Interact with Shadow DOM parents using pressSequentially if web_component_parent is present.
- Always reference the provided all_selectors list for each step.
- Confirm presence of success banner and new row in Account Activity after submission.

#### Detailed Steps:

| # | Action | Component | Description | Verification | URL |
|---|--------|-----------|-------------|--------------|-----|
| 1 | Navigate to homepage | Navigation | Load homepage | Page loaded | https://www.ngpf.org/bank-sim |
| 2 | Click 'GET STARTED NOW' button | Welcome Menu | Enter the Bank Simulator by clicking 'GET STARTED NOW'. | Modal for simulator welcome is displayed. | https://www.ngpf.org/bank-sim/home?returnUrl=%2F |
| 3 | Click 'Ok' on welcome modal | Welcome Modal | Acknowledge the welcome modal to proceed. | Dashboard and sidebar fully visible. | https://www.ngpf.org/bank-sim/ |
| 4 | Click 'DEPOSIT CHECKS' in sidebar | Sidebar Navigation | Navigate to check deposit simulation screen. | 'Deposit Checks' form appears. | https://www.ngpf.org/bank-sim/deposit-check |
| 5 | Open 'To' account dropdown | Deposit Account Dropdown | Expand account selection dropdown menu for deposit. | Account dropdown with options is expanded for selection. | https://www.ngpf.org/bank-sim/deposit-check |
| 6 | Select 'CHECKING' account option | Account Dropdown Option | Choose 'CHECKING (Available Balance is $216.04)' from account options. | Deposit form is now ready for amount and check images. | https://www.ngpf.org/bank-sim/deposit-check |
| 7 | Fill 'Amount' field | Amount Field | Input check amount: 100.00 | Amount is entered in input field. | https://www.ngpf.org/bank-sim/deposit-check |
| 8 | Click 'Front' button to upload check front | Upload Front Button | Initiate upload of check's front image. | Modal for uploading/displaying front image opens. | https://www.ngpf.org/bank-sim/deposit-check |
| 9 | Click 'close' icon on front image modal | Front Side Modal Close | Close the modal displaying the front image. | Back at deposit form. | https://www.ngpf.org/bank-sim/deposit-check |
| 10 | Click 'Back' button to upload check back | Check Deposit Back Image Button | Trigger upload for the back side of the check. | Modal for uploading/displaying back image opens. | https://www.ngpf.org/bank-sim/deposit-check |
| 11 | Click 'close' icon on back image modal | Back Image Modal | Close back image modal to continue deposit. | Deposit form visible; all requirements met for deposit. | https://www.ngpf.org/bank-sim/deposit-check |
| 12 | Click 'Submit' button | Check Deposit Submit Button | Submit the check deposit simulation form. | Confirmation banner and Account Activity update. | https://www.ngpf.org/bank-sim/account |

#### Expected Results:
- User completes workflow successfully.
- No errors during navigation or deposit.
- Confirmation banner ('You have successfully deposited your check.') is visible.
- New record for $100.00 deposit appears in Account Activity.

#### Edge Cases:
- Slow network or lag in modal dialogs.
- User interrupts workflow before submission.
- Missing either image upload and submits (should error).
- Submits with invalid amount (negative, blank, or non-numeric).

#### Data Requirements:
- Valid simulator test account available.
- Amount input must be numeric and positive.
- Front and back check images must be uploadable (or simulation widget must respond as if successful on click).

#### Prerequisites:
- Site is accessible at https://www.ngpf.org/bank-sim
- No service outages or modal bugs

## Captured Selectors

- **Total**: 33

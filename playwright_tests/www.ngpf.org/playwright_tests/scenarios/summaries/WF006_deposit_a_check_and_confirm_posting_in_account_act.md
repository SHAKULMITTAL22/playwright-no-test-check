# Scenario Summary: check_deposit_workflow_-_complete_user_journey_06_1774243851

## Overview

- **Workflow ID**: WF006
- **Title**: Deposit a Check and Confirm Posting in Account Activity
- **Goal**: Simulate check deposit by entering amount, selecting account, uploading required images, and confirming deposit. Success: user receives confirmation message and a new deposit record is visible in Account Activity.
- **Feature Area**: Check Deposit Simulation
- **Site URL**: https://www.ngpf.org/bank-sim
- **Site Type**: saas — Educational Banking Simulator
- **Confidence Score**: 0.98
- **Auth Required**: False
- **Generated On**: 2026-03-23T11:00:51.339627

## User Journeys

### 1. Check Deposit Simulation
_Complete check deposit workflow in educational banking simulator_

- **Business Value**: Enables users to practice banking operations in a risk-free environment
- **User Persona**: Student learning banking processes
- **Frequency**: weekly
- **Complexity**: medium

## Scenarios

### 1. Check Deposit Workflow - Complete User Journey
**Type**: e2e_business_workflow | **Priority**: high

> End-to-end check deposit simulation including form completion, image uploads, and verification

**Business Goal**: Verify users can complete check deposit simulation workflow

**User Story**: As a student, I want to practice depositing a check so that I can learn banking processes in a safe environment

**Workflow Narrative**:
User navigates to NGPF Bank Simulator, accesses check deposit feature, completes deposit form with CHECKING account and $100.00 amount, uploads simulated check images (front and back), submits deposit, receives confirmation, and verifies the transaction appears in account activity with correct details.

#### Implementation Guidance:
- Use waitForSelector for modals and dynamic content
- Handle Angular Material components with proper role selectors
- Close simulated check image modals after they appear
- Verify success notification and account balance changes
- Account activity verification requires navigation to accounts page

#### Detailed Steps:

| # | Action | Component | Description | Verification | URL |
|---|--------|-----------|-------------|--------------|-----|
| 1 | Navigate to NGPF Bank Simulator | Navigation | Load the bank simulator homepage | Page loaded successfully | https://www.ngpf.org/bank-sim |
| 2 | Click GET STARTED NOW button | Landing Page Start Button | Enter the bank simulator interface | Bank simulator interface loads | https://www.ngpf.org/bank-sim/home |
| 3 | Dismiss welcome modal | Welcome Modal | Click Ok button to dismiss welcome modal | Modal dismissed and dashboard visible | https://www.ngpf.org/bank-sim/ |
| 4 | Click DEPOSIT CHECKS in sidebar | Navigation Sidebar | Navigate to check deposit feature | Check deposit form loads | https://www.ngpf.org/bank-sim/deposit-check |
| 5 | Click To account dropdown | To Account Dropdown | Open account selection dropdown | Dropdown opens showing account options | https://www.ngpf.org/bank-sim/deposit-check |
| 6 | Select CHECKING account | Account Selection Dropdown | Choose CHECKING account as deposit destination | CHECKING account selected in dropdown | https://www.ngpf.org/bank-sim/deposit-check |
| 7 | Enter deposit amount | Amount Input Field | Input $100.00 as deposit amount | Amount field shows $100.00 | https://www.ngpf.org/bank-sim/deposit-check |
| 8 | Upload front check image | Front Check Image Upload | Click Front button to simulate front check image upload | Front check image modal appears | https://www.ngpf.org/bank-sim/deposit-check |
| 9 | Close front check modal | Front Check Modal | Close the front check image modal | Modal closes and form is visible | https://www.ngpf.org/bank-sim/deposit-check |
| 10 | Upload back check image | Back Check Image Upload | Click Back button to simulate back check image upload | Back check image modal appears | https://www.ngpf.org/bank-sim/deposit-check |
| 11 | Close back check modal | Back Check Image Modal | Close the back check image modal | Modal closes and form is ready for submission | https://www.ngpf.org/bank-sim/deposit-check |
| 12 | Submit check deposit | Submit Button | Click Submit button to process the check deposit | Success notification appears | https://www.ngpf.org/bank-sim/deposit-check |
| 13 | Navigate to Account Activity | Accounts Menu | Click ACCOUNTS to access account activity page | Account activity page loads with transaction history | https://www.ngpf.org/bank-sim/account |
| 14 | Verify deposit transaction | Account Activity Table | Confirm new deposit record appears with correct details | Deposit record shows: 'Deposit Check To Checking Account', $100.00 amount, updated balance $316.04 | https://www.ngpf.org/bank-sim/account |

#### Expected Results:
- User successfully completes check deposit workflow
- Green confirmation message appears: 'You have successfully deposited your check.'
- New transaction record appears in Account Activity with correct amount
- Account balance increases from $216.04 to $316.04

#### Edge Cases:
- Form validation with missing required fields
- Different account selection (SAVING vs CHECKING)
- Various deposit amounts
- Modal handling and proper closure

#### Data Requirements:
- Valid deposit amount (e.g., 100.00)
- Account selection (CHECKING account with existing balance)
- Simulated check image uploads (handled by system)

#### Prerequisites:
- NGPF Bank Simulator site accessible
- Angular Material components render correctly
- Bank simulator properly initialized

## Captured Selectors

- **Total**: 36

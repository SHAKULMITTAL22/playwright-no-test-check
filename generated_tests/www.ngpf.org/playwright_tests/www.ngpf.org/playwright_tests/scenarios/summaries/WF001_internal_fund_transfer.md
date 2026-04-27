# Scenario Summary: w01_internal_fund_transfer

## Overview

- **Workflow ID**: WF001
- **Title**: Internal Fund Transfer
- **Goal**: Initiate a transfer between accounts and verify it in history.
- **Feature Area**: Fund Transfers
- **Site URL**: https://www.ngpf.org/bank-sim/home
- **Site Type**: dashboard — Banking Simulation and Financial Literacy
- **Confidence Score**: 1.0
- **Auth Required**: False
- **Generated On**: 2026-04-27T09:30:51.240401

## User Journeys

### 1. Internal Fund Transfer
_Initiate a transfer between checking and savings accounts and verify the transaction in the history log._

- **Business Value**: Allows users to manage liquidity between accounts within the banking platform.
- **User Persona**: Student/Bank User
- **Frequency**: daily
- **Complexity**: medium

## Scenarios

### 1. Discovered Workflow: e2e_business_workflow - Complete User Journey
**Type**: e2e_business_workflow | **Priority**: high

> Comprehensive test covering the initiation of a fund transfer from Checking to Savings, including navigation through the simulation start and menu systems.

**Business Goal**: Verify users can successfully transfer funds between internal accounts.

**User Story**: As a bank user, I want to transfer money from my checking account to my savings account so that I can manage my savings goals.

**Workflow Narrative**:
The user starts the bank simulation, dismisses the welcome modal, and navigates to the Transfers section. They then initiate a new transfer by selecting a single payment frequency, choosing the Checking account as the source and Savings as the destination. After entering an amount of 50 and a specific payment date, they save the transfer and are redirected to the transfer history page.

#### Implementation Guidance:
- The application uses Angular Material components; ensure to use click actions on comboboxes before selecting options from the overlay.
- Several elements are wrapped in Material containers (mat-card-content, mat-form-field); use the provided web_component_parent metadata for precise targeting.
- The 'Payment Date' field may require specific formatting or interaction with a date picker if simple fill fails, though 'fill' was successful in the trace.

#### Detailed Steps:

| # | Action | Component | Description | Verification | URL |
|---|--------|-----------|-------------|--------------|-----|
| 1 | Navigate to homepage | Navigation | Load the bank simulation home page | Page loaded | https://www.ngpf.org/bank-sim/home |
| 2 | click | Start Button | Click the 'GET STARTED NOW' button to enter the simulation | Redirected to the main dashboard | https://www.ngpf.org/bank-sim/home?returnUrl=%2Fhome%2F |
| 3 | click | Welcome Modal | Dismiss the welcome dialog by clicking 'Ok' | Modal is closed | https://www.ngpf.org/bank-sim/ |
| 4 | click | Side Menu | Expand the 'TRANSFERS' menu item | Transfers menu expands | https://www.ngpf.org/bank-sim/ |
| 5 | click | Side Menu Link | Click 'MAKE A TRANSFER' from the expanded menu | Navigated to transfer form | https://www.ngpf.org/bank-sim/ |
| 6 | click | Transfer Form | Open the 'PAYMENT FREQUENCY' dropdown | Frequency options are visible | https://www.ngpf.org/bank-sim/transfer |
| 7 | click | Dropdown Option | Select 'SINGLE' frequency | Frequency set to SINGLE | https://www.ngpf.org/bank-sim/transfer |
| 8 | click | Transfer Form | Open the 'Transfer From' dropdown | Source accounts are visible | https://www.ngpf.org/bank-sim/transfer |
| 9 | click | Dropdown Option | Select 'CHECKING ($216.04)' as the source account | Checking account selected | https://www.ngpf.org/bank-sim/transfer |
| 10 | click | Transfer Form | Open the 'Transfer To' dropdown | Destination accounts are visible | https://www.ngpf.org/bank-sim/transfer |
| 11 | click | Dropdown Option | Select 'SAVING ($230.00)' as the destination account | Saving account selected | https://www.ngpf.org/bank-sim/transfer |
| 12 | input_text | Transfer Form | Enter the transfer amount '50' | Amount field contains 50 | https://www.ngpf.org/bank-sim/transfer |
| 13 | input_text | Transfer Form | Enter the payment date '04/10/2026' | Date field contains 04/10/2026 | https://www.ngpf.org/bank-sim/transfer |
| 14 | click | Transfer Form | Click 'Save' to submit the transfer | Redirected to transfer history page | https://www.ngpf.org/bank-sim/transfer |

#### Expected Results:
- User successfully navigates to the transfer form.
- The transfer is submitted without validation errors.
- The application redirects the user to the transfer history page (display-transfers).

#### Edge Cases:
- Transfer amount exceeding available balance.
- Invalid date format in the payment date field.
- Attempting to transfer to the same account (source = destination).

#### Data Requirements:
- Active session in the NGPF Bank Simulator.
- Checking account with at least $50 balance.
- Valid Savings account.

#### Prerequisites:
- Browser is navigated to the NGPF Bank Sim home page.

## Captured Selectors

- **Total**: 21

# Scenario Summary: internal_fund_transfer_-_complete_user_journey_01_1775031262

## Overview

- **Workflow ID**: WF001
- **Title**: Internal Fund Transfer
- **Goal**: Transfer funds between Checking and Savings accounts and verify the transaction.
- **Feature Area**: Banking Transactions
- **Site URL**: https://www.ngpf.org/bank-sim/home
- **Site Type**: service — Banking Simulation and Financial Literacy
- **Confidence Score**: 1.0
- **Auth Required**: False
- **Generated On**: 2026-04-01T13:44:22.452021

## User Journeys

### 1. Internal Fund Transfer
_User navigates to the transfer portal, selects source and destination accounts, and executes a single transfer._

- **Business Value**: Ensures core banking functionality for fund management is operational.
- **User Persona**: Student/User learning banking operations
- **Frequency**: daily
- **Complexity**: medium

## Scenarios

### 1. Discovered Workflow: Internal Fund Transfer - Complete User Journey
**Type**: e2e_business_workflow | **Priority**: high

> Comprehensive test covering the end-to-end fund transfer process from home page to transaction confirmation.

**Business Goal**: Verify users can complete the internal fund transfer workflow

**User Story**: As a student, I want to transfer funds between my accounts so that I can practice managing my finances.

**Workflow Narrative**:
The user starts the simulation, navigates to the transfers section, selects a single payment frequency, chooses Checking as the source and Savings as the destination, inputs the transfer amount, and saves the transaction.

#### Implementation Guidance:
- Use page.waitForURL to confirm navigation after clicking 'GET STARTED NOW'.
- Since this uses Angular Material, use page.click() followed by page.getByRole('option') for dropdowns.
- Use fill() for the amount input field.

#### Detailed Steps:

| # | Action | Component | Description | Verification | URL |
|---|--------|-----------|-------------|--------------|-----|
| 1 | Navigate to homepage | Navigation | Load homepage | Page loaded | https://www.ngpf.org/bank-sim/home |
| 2 | click | GET STARTED NOW button | Start simulation | Redirected to simulation dashboard | https://www.ngpf.org/bank-sim/ |
| 3 | click | Ok button | Dismiss welcome modal | Modal closed | https://www.ngpf.org/bank-sim/ |
| 4 | click | TRANSFERS link | Expand transfers menu | Sidebar menu expanded | https://www.ngpf.org/bank-sim/ |
| 5 | click | MAKE A TRANSFER link | Navigate to transfer page | Redirected to transfer form | https://www.ngpf.org/bank-sim/transfer |
| 6 | select_option | PAYMENT FREQUENCY | Set frequency to SINGLE | Frequency selected | https://www.ngpf.org/bank-sim/transfer |
| 7 | select_option | Transfer From | Select CHECKING ($216.04) | Source account selected | https://www.ngpf.org/bank-sim/transfer |
| 8 | select_option | Transfer To | Select SAVING ($230.00) | Destination account selected | https://www.ngpf.org/bank-sim/transfer |
| 9 | input_text | Amount | Enter 50.00 | Amount entered | https://www.ngpf.org/bank-sim/transfer |
| 10 | click | Save button | Execute transfer | Redirected to transfer history | https://www.ngpf.org/bank-sim/transfer/display-transfers |

#### Expected Results:
- User successfully navigates to transfer history
- Transaction is confirmed

#### Edge Cases:
- Insufficient funds
- Invalid amount format

#### Data Requirements:
- Active simulation session
- Sufficient balance in Checking

#### Prerequisites:
- Site accessible

## Captured Selectors

- **Total**: 18

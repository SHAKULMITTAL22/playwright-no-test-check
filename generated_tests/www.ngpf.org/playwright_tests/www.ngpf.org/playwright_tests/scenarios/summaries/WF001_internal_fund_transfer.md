# Scenario Summary: w01_internal_fund_transfer

## Overview

- **Workflow ID**: WF001
- **Title**: Internal Fund Transfer
- **Goal**: Verify users can complete the internal fund transfer workflow.
- **Feature Area**: Financial Literacy and Banking Simulation
- **Site URL**: https://www.ngpf.org/bank-sim/home
- **Site Type**: service — Financial Literacy and Banking Simulation
- **Confidence Score**: 0.98
- **Auth Required**: False
- **Generated On**: 2026-04-13T05:02:30.990812

## User Journeys

### 1. Internal Fund Transfer
_User navigates to the transfer portal and executes a transfer between internal accounts._

- **Business Value**: Ensures students can practice banking operations in a simulated environment.
- **User Persona**: Student
- **Frequency**: daily
- **Complexity**: medium

## Scenarios

### 1. Discovered Workflow: e2e_business_workflow - Complete User Journey
**Type**: e2e_business_workflow | **Priority**: high

> Comprehensive test covering the internal fund transfer process from dashboard to confirmation.

**Business Goal**: Verify users can complete the internal fund transfer workflow

**User Story**: As a student, I want to transfer funds between my checking and savings accounts so that I can manage my simulated budget.

**Workflow Narrative**:
The user starts the simulation, navigates to the transfers section, selects account details, inputs the transfer amount, and submits the transaction.

#### Implementation Guidance:
- Use page.waitForURL to ensure navigation completes after clicking 'Save'.
- The application uses Angular Material; ensure elements are interactable before clicking.

#### Detailed Steps:

| # | Action | Component | Description | Verification | URL |
|---|--------|-----------|-------------|--------------|-----|
| 1 | Navigate to homepage | Navigation | Load banking simulation homepage | Page loaded | https://www.ngpf.org/bank-sim/transfer |
| 2 | click | Button | Start simulation | Redirected to dashboard | https://www.ngpf.org/bank-sim/ |
| 3 | click | Modal | Dismiss welcome modal | Modal closed | https://www.ngpf.org/bank-sim/ |
| 4 | click | Menu | Open transfers menu | Menu expanded | https://www.ngpf.org/bank-sim/ |
| 5 | click | Link | Select Make Transfer | Navigated to transfer form | https://www.ngpf.org/bank-sim/transfer |
| 6 | select_option | Dropdown | Set frequency to Single | Frequency set | https://www.ngpf.org/bank-sim/transfer |
| 7 | fill | Input | Input transfer amount | Amount entered | https://www.ngpf.org/bank-sim/transfer |
| 8 | click | Button | Submit transfer | Transfer processed | https://www.ngpf.org/bank-sim/transfer/display-transfers |

#### Expected Results:
- Transfer successfully processed
- Redirected to display-transfers page

#### Edge Cases:
- Insufficient funds
- Invalid amount format

#### Data Requirements:
- Active user session
- Sufficient balance in source account

#### Prerequisites:
- Site accessible

## Captured Selectors

- **Total**: 14

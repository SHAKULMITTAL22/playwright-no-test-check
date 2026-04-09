# Scenario Summary: w01_internal_fund_transfer

## Overview

- **Workflow ID**: WF001
- **Title**: Internal Fund Transfer
- **Goal**: Initiate a transfer between accounts and verify it in history.
- **Feature Area**: Fund Transfers
- **Site URL**: https://www.ngpf.org/bank-sim/home
- **Site Type**: service — Financial Literacy and Banking Simulation
- **Confidence Score**: 0.98
- **Auth Required**: False
- **Generated On**: 2026-04-09T07:24:50.294755

## User Journeys

### 1. Internal Fund Transfer
_User navigates to the transfer module, configures a single transfer between accounts, and submits the transaction._

- **Business Value**: Ensures core banking simulation functionality is operational.
- **User Persona**: Student/User
- **Frequency**: daily
- **Complexity**: medium

## Scenarios

### 1. Discovered Workflow: e2e_business_workflow - Complete User Journey
**Type**: e2e_business_workflow | **Priority**: high

> Comprehensive test covering the internal fund transfer process from start to finish.

**Business Goal**: Verify users can complete the internal fund transfer workflow.

**User Story**: As a student, I want to transfer funds between my accounts so that I can practice managing my finances.

**Workflow Narrative**:
The user initiates a transfer simulation, navigates through the dashboard to the transfer form, selects accounts, sets an amount, and successfully submits the transfer.

#### Implementation Guidance:
- Use page.waitForURL to confirm navigation after clicking 'Save'.
- Since the site uses Angular Material, use pressSequentially() for input fields if standard fill() causes validation issues.
- Ensure the date format matches the simulation requirements (MM/DD/YYYY).

#### Detailed Steps:

| # | Action | Component | Description | Verification | URL |
|---|--------|-----------|-------------|--------------|-----|
| 1 | Navigate to homepage | Navigation | Load the transfer page | Page loaded | https://www.ngpf.org/bank-sim/transfer |
| 2 | click | Button | Start simulation | Redirected to dashboard | https://www.ngpf.org/bank-sim/ |
| 3 | click | Menu | Expand transfers menu | Menu expanded | https://www.ngpf.org/bank-sim/ |
| 4 | click | Link | Select Make a Transfer | Navigated to transfer form | https://www.ngpf.org/bank-sim/transfer |
| 5 | input_text | Form | Submit transfer details | Redirected to history | https://www.ngpf.org/bank-sim/transfer/display-transfers |

#### Expected Results:
- User completes workflow
- No errors

#### Edge Cases:
- Insufficient funds
- Invalid date format

#### Data Requirements:
- Test accounts
- Valid inputs

#### Prerequisites:
- Site accessible

## Captured Selectors

- **Total**: 8

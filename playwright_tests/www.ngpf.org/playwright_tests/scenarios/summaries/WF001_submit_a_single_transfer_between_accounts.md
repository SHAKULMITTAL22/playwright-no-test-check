# Scenario Summary: e2e_business_workflow_-_complete_user_journey_01_1774191904

## Overview

- **Workflow ID**: WF001
- **Title**: Submit a Single Transfer Between Accounts
- **Goal**: Successfully transfer funds between Checking and Saving accounts using the Make a Transfer form. Ensure confirmation and correct entry in transfer history.
- **Feature Area**: Transfer Funds Workflow
- **Site URL**: https://www.ngpf.org/bank-sim
- **Site Type**: dashboard — Banking simulator for educational use; users practice personal finance management via realistic banking features.
- **Confidence Score**: 0.95
- **Auth Required**: False
- **Generated On**: 2026-03-22T20:35:04.473753

## User Journeys

### 1. Primary Business Workflow
_Main user flow_

- **Business Value**: Ensures banking simulation works and records transfer history correctly
- **User Persona**: Student or educator practicing personal finance skills
- **Frequency**: daily
- **Complexity**: high

## Scenarios

### 1. Discovered Workflow: e2e_business_workflow - Complete User Journey
**Type**: e2e_business_workflow | **Priority**: high

> Comprehensive test covering a user transferring funds between Checking and Saving accounts, confirming the operation in UI and transaction history.

**Business Goal**: Verify users can transfer funds between accounts, with confirmation and accurate transfer history recording.

**User Story**: As a banking simulator user, I want to transfer funds between my Checking and Saving accounts so that I can see correct financial movements and confirmation.

**Workflow Narrative**:
A user starts on the NGPF Bank Simulator landing page, completes onboarding, navigates through the sidebar to initiate a transfer, fills the Make a Transfer form (Single frequency, Checking to Saving, $50, today's date), submits, and visually validates both confirmation snackbar and the Past Transfers history. Every field interaction is preceded by selector capture, as confirmed in agent steps.

#### Implementation Guidance:
- Always use each step's all_selectors array for interaction and fallback.
- For interactions with web components (shadow DOM), respect the web_component_parent presence and use pressSequentially().
- Use waitForSelector especially for modal dialogs/snackbars and after navigation.
- Verify both confirmation snackbar and updated Past Transfers table for test completeness.
- Replay input values exactly as recorded (no dummy data).

#### Detailed Steps:

| # | Action | Component | Description | Verification | URL |
|---|--------|-----------|-------------|--------------|-----|
| 1 | Navigate to homepage | Navigation | Load homepage | Page loaded | https://www.ngpf.org/bank-sim |
| 2 | Click button | Landing Page Main Button | Click 'GET STARTED NOW' to begin workflow | 'GET STARTED NOW' pressed, modal appears | https://www.ngpf.org/bank-sim/home?returnUrl=%2F |
| 3 | Click button | Onboarding Modal | Dismiss onboarding modal by clicking 'Ok' | Modal disappears, dashboard visible | https://www.ngpf.org/bank-sim/ |
| 4 | Click sidebar menu | Sidebar TRANSFERS Expand | Expand 'TRANSFERS' section in sidebar | 'MAKE A TRANSFER' visible | https://www.ngpf.org/bank-sim/ |
| 5 | Click sidebar menu | Transfer Menu | Click 'MAKE A TRANSFER' to open transfer form | Transfer form displayed | https://www.ngpf.org/bank-sim/transfer |
| 6 | Expand dropdown | Payment Frequency Dropdown | Open 'PAYMENT FREQUENCY' dropdown | Dropdown expanded | https://www.ngpf.org/bank-sim/transfer |
| 7 | Select dropdown option | PAYMENT FREQUENCY Dropdown | Select 'SINGLE' option in payment frequency | 'SINGLE' selected in dropdown | https://www.ngpf.org/bank-sim/transfer |
| 8 | Expand dropdown | Transfer From Dropdown | Open 'Transfer From' dropdown | Dropdown expanded | https://www.ngpf.org/bank-sim/transfer |
| 9 | Select dropdown option | Transfer From Dropdown | Select 'CHECKING ($216.04)' as source account | 'CHECKING ($216.04)' selected | https://www.ngpf.org/bank-sim/transfer |
| 10 | Expand dropdown | Transfer To Dropdown | Open 'Transfer To' dropdown | Dropdown expanded | https://www.ngpf.org/bank-sim/transfer |
| 11 | Select dropdown option | Transfer To Dropdown | Select 'SAVING ($230.00)' as recipient account | 'SAVING ($230.00)' selected | https://www.ngpf.org/bank-sim/transfer |
| 12 | Fill input field | Amount Field | Enter transfer amount '50' | Amount field contains '50' | https://www.ngpf.org/bank-sim/transfer |
| 13 | Fill input field | Payment Date field | Set payment date '3/22/2026' | Date field updated | https://www.ngpf.org/bank-sim/transfer |
| 14 | Click button | Make Transfer Form: Save Button | Submit transfer form by clicking 'Save' | Confirmation snackbar/modal, Past Transfers history entry | https://www.ngpf.org/bank-sim/transfer/display-transfers |
| 15 | Verify confirmation | Snackbar & Past Transfers Table | Validate green snackbar displays 'Amount has been transferred to Saving Account' and transaction appears in Past Transfers table | Snackbar visible, Past Transfers updated (id: 1100002, Date: 03/22/2026, Description: Transfer to Saving Account, Amount: -$50.00) | https://www.ngpf.org/bank-sim/transfer/display-transfers |

#### Expected Results:
- User completes workflow; transfer form submitted and confirmation visible
- Past Transfers table shows new entry reflecting transaction
- No errors encountered

#### Edge Cases:
- Slow network – verify modal and snackbar appear after delay
- User session interruption after transfer but before confirmation displays
- Attempting transfer with insufficient funds or invalid input

#### Data Requirements:
- Test accounts with sufficient funds (Checking: $216.04, Saving: $230.00)
- Valid input values: exact values as recorded (Single, $50, 3/22/2026)

#### Prerequisites:
- Site accessible and responsive at https://www.ngpf.org/bank-sim

## Captured Selectors

- **Total**: 39

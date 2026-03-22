# Scenario Summary: bill_payment_recipient_management_-_complete_user_journey_02_1774191804

## Overview

- **Workflow ID**: WF005
- **Title**: Add, Edit, and Delete a Bill Payment Recipient
- **Goal**: User creates a new bill payment recipient, updates recipient information, and deletes the recipient. Success: confirmation messages for each action and updates reflected in the recipients list.
- **Feature Area**: Bill Payments & Bill Management
- **Site URL**: https://www.ngpf.org/bank-sim
- **Site Type**: dashboard — Banking simulator for bill payments and financial literacy
- **Confidence Score**: 0.95
- **Auth Required**: False
- **Generated On**: 2026-03-22T20:33:24.552354

## User Journeys

### 1. Primary Business Workflow
_Main user flow for managing bill payment recipients_

- **Business Value**: Ensures users can successfully add, edit, and delete bill payment recipients, reflecting accurate state and UI feedback
- **User Persona**: Consumer practicing online banking features for financial education
- **Frequency**: daily
- **Complexity**: high

## Scenarios

### 1. Discovered Workflow: Bill Payment Recipient Management - Complete User Journey
**Type**: e2e_business_workflow | **Priority**: high

> Comprehensive test covering creation, update, and deletion of a bill payment recipient, with UI confirmations after each action and strict selector-capture compliance.

**Business Goal**: Verify users can complete the add, edit, and delete bill payment recipient workflow with proper UI feedback.

**User Story**: As a simulated banking user, I want to add, edit, and delete a bill payment recipient so that I can manage recipients securely and see confirmation of my changes.

**Workflow Narrative**:
A user navigates to the NGPF Bank Simulator, starts the onboarding, enters the 'BILLS' section, manages bill payment recipients by adding 'John Doe', editing to 'Jane Smith', and deleting them, observing confirmation banners and UI state updates at each stage. Every actionable step uses stable, verified selectors as per compliance policy.

#### Implementation Guidance:
- Use all provided alternative selectors for robust identification.
- For elements within Angular Material or other web components, switch to sequential press/type actions if web_component_parent is present.
- Wait for confirmation banners (toast notifications) after each critical operation (add/edit/delete).
- Use assertions on the recipients list after each operation to verify visible state matches action (row existence, table updates, emptiness).
- Include navigation waits for all page changes.
- Ensure input fields not interacted with (pre-filled) are left untouched, as in execution.

#### Detailed Steps:

| # | Action | Component | Description | Verification | URL |
|---|--------|-----------|-------------|--------------|-----|
| 1 | Navigate to homepage | Navigation | Load homepage | Page loaded | https://www.ngpf.org/bank-sim |
| 2 | Click | Landing Get Started Button | Click 'GET STARTED NOW' to begin onboarding | 'Ok' welcome dialog appears | https://www.ngpf.org/bank-sim/home?returnUrl=%2F |
| 3 | Click | Onboarding Modal | Click 'Ok' on welcome modal to continue | User lands on main dashboard/home | https://www.ngpf.org/bank-sim/ |
| 4 | Click | Sidebar Navigation | Click 'BILLS' in sidebar to expand bill management options | 'MANAGE RECIPIENT' visible in sidebar navigation | https://www.ngpf.org/bank-sim/ |
| 5 | Click | Navigation Sidebar | Click 'MANAGE RECIPIENT' to open recipient management | '+ ADD RECIPIENT' button available | https://www.ngpf.org/bank-sim/pay-bill/manage-recipient |
| 6 | Click | Manage Recipients Panel | Click '+ ADD RECIPIENT' to start adding a new bill recipient | Add Recipient dialog appears with entry fields | https://www.ngpf.org/bank-sim/pay-bill/manage-recipient |
| 7 | Input | Recipient Name Field | Type 'John Doe' into the 'RECIPIENT NAME' input in Add Recipient dialog | Input field shows 'John Doe' | https://www.ngpf.org/bank-sim/pay-bill/manage-recipient |
| 8 | Click | Add Recipient Modal | Click 'SUBMIT' to add the recipient (all other form fields are left as pre-filled) | Banner shows 'Payee updated successfully.' Recipient appears in the table. | https://www.ngpf.org/bank-sim/pay-bill/manage-recipient |
| 9 | Click | Recipients Table Edit Link | Click 'Edit' on the listed recipient to open the edit recipient modal | Edit dialog modal present with pre-filled recipient info | https://www.ngpf.org/bank-sim/pay-bill/manage-recipient |
| 10 | Input | Edit Recipient Modal | Edit 'RECIPIENT NAME' from 'John Doe' to 'Jane Smith' | Updated name visible in input field before submit | https://www.ngpf.org/bank-sim/pay-bill/manage-recipient |
| 11 | Click | Edit Recipient Modal | Click 'SUBMIT' to save the recipient edits | Banner confirms update; recipient table shows 'Jane Smith' | https://www.ngpf.org/bank-sim/pay-bill/manage-recipient |
| 12 | Click | Recipients List | Click 'Delete' to remove the recipient from the list | Banner: 'Payee deleted successfully.' Recipients list is empty. | https://www.ngpf.org/bank-sim/pay-bill/manage-recipient |

#### Expected Results:
- User completes workflow for add, edit, and delete recipient
- UI confirmation banners appear after each main action
- Recipients list updates as expected (add, edit, then empty after delete)
- No errors encountered

#### Edge Cases:
- Slow network or delayed dialog modals
- Recipient with same name already exists (not covered by this flow, but as a variation)
- Cancelling out of dialog then retrying
- Unavailable backend/server error injected after clicking submit

#### Data Requirements:
- Test accounts with no existing recipients
- Valid recipient name values: 'John Doe', 'Jane Smith'

#### Prerequisites:
- https://www.ngpf.org/bank-sim is available and server responds
- Browser compatible with Angular Material overlays

## Captured Selectors

- **Total**: 33

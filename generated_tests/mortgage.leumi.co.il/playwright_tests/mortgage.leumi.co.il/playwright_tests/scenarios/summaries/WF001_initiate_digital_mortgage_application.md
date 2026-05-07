# Scenario Summary: w01_initiate_digital_mortgage_application

## Overview

- **Workflow ID**: WF001
- **Title**: Initiate Digital Mortgage Application
- **Goal**: Initiate a digital mortgage application for in-principle approval. Success: User reaches the application form (Currently blocked).
- **Feature Area**: Digital Mortgage Application
- **Site URL**: https://mortgage.leumi.co.il
- **Site Type**: service — Digital Banking and Mortgage Services
- **Confidence Score**: 0.98
- **Auth Required**: False
- **Generated On**: 2026-05-07T05:44:17.194309

## User Journeys

### 1. Initiate Digital Mortgage Application
_User navigates to the mortgage beginners page, dismisses any popups, and initiates the digital mortgage application process._

- **Business Value**: Drives customer acquisition by funneling users into the digital mortgage application pipeline.
- **User Persona**: Prospective homebuyer or mortgage applicant
- **Frequency**: daily
- **Complexity**: low

## Scenarios

### 1. Discovered Workflow: Initiate Digital Mortgage Application - Complete User Journey
**Type**: e2e_business_workflow | **Priority**: high

> Verifies that a user can successfully navigate to the mortgage application minisite from the beginners informational page.

**Business Goal**: Verify users can reach the digital mortgage application form without being blocked.

**User Story**: As a prospective homebuyer, I want to start my digital mortgage application so that I can get an in-principle approval.

**Workflow Narrative**:
The user starts on the 'First Step' beginners page for mortgages. An obstructing chat popup appears, which the user closes. The user then clicks the 'בואו נתחיל' (Let's Start) button and is successfully redirected to the mortgage application minisite.

#### Implementation Guidance:
- Use page.goto() to navigate directly to the beginners page.
- Implement a conditional check or waitForSelector for the chat popup close button, as popups may not always appear or might take a moment to load.
- Ensure navigation to the minisite is verified by checking the resulting URL after clicking the start button.

#### Detailed Steps:

| # | Action | Component | Description | Verification | URL |
|---|--------|-----------|-------------|--------------|-----|
| 1 | Navigate to Beginners Page | Navigation | Load the first step beginners page for mortgages. | Page loaded successfully. | https://mortgage.leumi.co.il/all-about-mortgage/category/beginners/first-step-0 |
| 2 | Close Chat Popup | Chat Widget | Click the close button on the chat popup to remove obstruction. | Chat popup is dismissed. | https://mortgage.leumi.co.il/all-about-mortgage/category/beginners/first-step-0 |
| 3 | Click Start Application Button | Call to Action Button | Click the 'בואו נתחיל' button to initiate the application. | User is redirected to the mortgage minisite. | https://mortgage.leumi.co.il/all-about-mortgage/category/beginners/first-step-0 |

#### Expected Results:
- User successfully navigates to the beginners page.
- Chat popup is closed without errors.
- Clicking the start button redirects the user to 'https://mortgage.leumi.co.il/minisite/mortgage'.

#### Edge Cases:
- Chat popup does not appear (ensure close action is conditional).
- Slow network causing delayed redirection to the minisite.

#### Prerequisites:
- Site is accessible.
- Mortgage minisite is active and accepting redirects.

## Captured Selectors

- **Total**: 3

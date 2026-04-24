# Scenario Summary: w01_initiate_digital_mortgage_application

## Overview

- **Workflow ID**: WF001
- **Title**: Initiate Digital Mortgage Application
- **Goal**: Start a new digital mortgage application process. Success: Redirected to the external FormTitan application.
- **Feature Area**: Digital Mortgage Application
- **Site URL**: https://mortgage.leumi.co.il
- **Site Type**: service — Banking and Mortgage Services
- **Confidence Score**: 0.95
- **Auth Required**: False
- **Generated On**: 2026-04-24T13:45:47.649482

## User Journeys

### 1. Initiate Digital Mortgage Application
_Start a new digital mortgage application process by navigating to the external FormTitan application._

- **Business Value**: Customer acquisition and digital onboarding for mortgage loans.
- **User Persona**: Prospective home buyer or current homeowner seeking refinancing
- **Frequency**: daily
- **Complexity**: low

## Scenarios

### 1. Initiate Digital Mortgage Application -- Partial
**Type**: partial_flow | **Priority**: high

> Attempt to start the digital mortgage application. The flow is partial because the expected external redirect did not occur.

**Business Goal**: Verify the entry point for the digital mortgage application is functional.

**User Story**: As a prospective borrower, I want to click the start button so that I can begin my digital mortgage application.

**Workflow Narrative**:
The user navigates to the Leumi mortgage homepage and clicks the 'בואו נתחיל' (Let's start) button. The agent expected to be redirected to an external FormTitan application but was instead routed to an internal minisite page, blocking further progress.

#### Implementation Guidance:
- Ensure to handle potential redirects after clicking the start button.
- Add an assertion to verify the resulting URL. In this partial flow, it lands on /minisite/mortgage instead of the expected external app.

#### Detailed Steps:

| # | Action | Component | Description | Verification | URL |
|---|--------|-----------|-------------|--------------|-----|
| 1 | Navigate to homepage | Navigation | Load the Leumi mortgage homepage | Page loaded successfully | https://mortgage.leumi.co.il |
| 2 | Click Start Button | Link 'בואו נתחיל' | Click the 'Let's start' button to initiate the application | Button click triggers navigation | https://mortgage.leumi.co.il/ |

#### Expected Results:
- User is able to click the start button
- Application navigates to the next step (currently an internal minisite instead of external app)

#### Edge Cases:
- Broken link or missing redirect configuration
- High latency during redirect

#### Prerequisites:
- Site accessible

## Captured Selectors

- **Total**: 2

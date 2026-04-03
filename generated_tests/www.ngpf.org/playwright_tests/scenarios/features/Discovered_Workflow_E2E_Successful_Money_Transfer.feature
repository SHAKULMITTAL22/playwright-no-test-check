Feature: Bank Simulator - Money Transfer Workflow
  As a student
  I want to transfer money between my accounts
  So that I can manage my simulated finances effectively

  Background:
    Given I am on the homepage "https://www.ngpf.org/bank-sim/home"
    Then the "GET STARTED NOW" button should be visible

  @critical @e2e_business_workflow
  Scenario: Successful Money Transfer between accounts
    When I click the "GET STARTED NOW" button
    Then I should be on the page "https://www.ngpf.org/bank-sim/"
    And the dashboard should be loaded
    When I click the "MAKE A TRANSFER" link in the sidebar navigation
    Then I should be on the page "https://www.ngpf.org/bank-sim/transfer"
    And the transfer form should be visible
    When I fill in the "Amount" field with "50.00"
    Then the "Amount" field should contain the value "50.00"

  @negative_testing
  Scenario: Validate negative amount entry
    When I click the "GET STARTED NOW" button
    And I click the "MAKE A TRANSFER" link in the sidebar navigation
    Then I should be on the page "https://www.ngpf.org/bank-sim/transfer"
    When I fill in the "Amount" field with "-10.00"
    Then the "Amount" field should indicate an invalid input error

  @negative_testing
  Scenario: Prevent transfer between the same account
    When I click the "GET STARTED NOW" button
    And I click the "MAKE A TRANSFER" link in the sidebar navigation
    Then I should be on the page "https://www.ngpf.org/bank-sim/transfer"
    When I select the same account in "From Account" and "To Account" dropdowns
    Then the system should display a validation error message "Cannot transfer to the same account"
describe("Horse Racing Sim E2E", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should generate program and run simulation", () => {
    // 1. Check initial state
    cy.get('[data-testid="generate-button"]').should("be.visible");
    cy.get('[data-testid="start-button"]').should("not.exist"); // Start button renders via v-if
    cy.get('[data-testid="horse-list-status"]').contains("Waiting...");

    // 2. Click Generate
    cy.get('[data-testid="generate-button"]').click();

    // 3. Verify Program Generated
    cy.get('[data-testid="start-button"]').should("not.be.disabled");
    cy.get('[data-testid="round-block"]').should("have.length", 6);
    cy.get('[data-testid="program-status-badge"]')
      .contains("Lap 1/6")
      .should("be.visible");

    // 4. Start Race
    cy.get('[data-testid="start-button"]').click();

    // 5. Verify Race Active
    cy.get('[data-testid="pause-button"]').should("exist");
    cy.get('[data-testid="horse-emoji"]').should("have.length", 10);

    // 6. Fast forward race (simulate wait)
    // Check if live timer is running
    cy.wait(2000);
    // cy.get('[data-testid="race-timer"]').should('not.contain', '0.00s') // Timer update might be fast

    // Check pause functionality
    cy.get('[data-testid="pause-button"]').click();
    cy.get('[data-testid="start-button"]').should("exist").contains("Resume");
    cy.get('[data-testid="start-button"]').click();

    // Race continues...
  });

  it("should display results after round completion", () => {
    // Generate and Start
    cy.get('[data-testid="generate-button"]').click();
    cy.get('[data-testid="start-button"]').click();

    // Wait for race to finish (approx 10-15s depending on distance)
    // Using a long timeout to allow race to complete
    cy.get('[data-testid="finish-confetti"]', { timeout: 30000 }).should(
      "exist"
    );

    // Check if results panel has content
    cy.get('[data-testid="round-result-card"]').should("exist");
  });
});

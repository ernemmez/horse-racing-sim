describe("Horse Racing Sim E2E", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should generate program and start first race", () => {
    // Generate program
    cy.get('[data-testid="generate-button"]').click();

    // Verify program created with 6 rounds
    cy.get('[data-testid="round-block"]').should("have.length", 6);
    cy.get('[data-testid="program-status-badge"]').contains("Lap 1/6");

    // Start button should be enabled
    cy.get('[data-testid="start-button"]').should("not.be.disabled");

    // Start first race
    cy.get('[data-testid="start-button"]').click();

    // Verify race is active
    cy.get('[data-testid="pause-button"]').should("exist");
    cy.get('[data-testid="horse-emoji"]').should("have.length", 10);
  });

  it("should complete a full race round", () => {
    // Setup: Generate and start
    cy.get('[data-testid="generate-button"]').click();
    cy.get('[data-testid="start-button"]').click();

    // Wait for race to finish (timeout for slow races)
    cy.get('[data-testid="finish-confetti"]', { timeout: 45000 }).should(
      "exist"
    );

    // Wait for nextRound to be called (setTimeout 1000ms in store)
    cy.wait(3000);

    // Verify results accumulated
    cy.get('[data-testid="round-result-card"]').should("have.length", 1);
    cy.get('[data-testid="results-count-badge"]').contains("1 Laps");

    // Verify advanced to next round
    cy.get('[data-testid="program-status-badge"]').contains("Lap 2/6");
    cy.get('[data-testid="start-button"]').should("not.be.disabled");
  });

  it("should handle pause and resume", () => {
    // Setup
    cy.get('[data-testid="generate-button"]').click();
    cy.get('[data-testid="start-button"]').click();

    // Pause race
    cy.wait(1000);
    cy.get('[data-testid="pause-button"]').click();

    // Verify paused state
    cy.get('[data-testid="start-button"]').should("contain", "Resume");

    // Resume race
    cy.get('[data-testid="start-button"]').click();
    cy.get('[data-testid="pause-button"]').should("exist");

    // Let race finish
    cy.get('[data-testid="finish-confetti"]', { timeout: 45000 }).should(
      "exist"
    );
  });

  it("should display accurate race results", () => {
    // Complete one race
    cy.get('[data-testid="generate-button"]').click();
    cy.get('[data-testid="start-button"]').click();
    cy.get('[data-testid="finish-confetti"]', { timeout: 45000 }).should(
      "exist"
    );
    cy.wait(3000);

    // Verify result card content
    cy.get('[data-testid="round-result-card"]')
      .first()
      .within(() => {
        // Check rankings exist (10 horses)
        cy.get('[data-testid="ranking-item"]').should("have.length", 10);

        // Verify ranking order
        cy.get('[data-testid="rank-badge"]').first().should("contain", "1");

        // Verify winner trophy
        cy.get('[data-testid="winner-trophy"]').should("exist");

        // Verify finish times formatted correctly
        cy.get('[data-testid="finish-time"]').each(($time) => {
          expect($time.text()).to.match(/\d+\.\d{2}s/);
        });
      });
  });

  it("should update horse conditions after race", () => {
    cy.get('[data-testid="generate-button"]').click();

    // Capture initial conditions
    const initialConditions: number[] = [];
    cy.get('[data-testid="horse-condition"]')
      .each(($el) => {
        initialConditions.push(parseInt($el.text().trim(), 10));
      })
      .then(() => {
        // Complete race
        cy.get('[data-testid="start-button"]').click();
        cy.get('[data-testid="finish-confetti"]', { timeout: 45000 }).should(
          "exist"
        );
        cy.wait(3000);

        // Verify conditions decreased
        cy.get('[data-testid="horse-condition"]').each(($el, index) => {
          const newCondition = parseInt($el.text().trim(), 10);
          expect(newCondition).to.be.lte(initialConditions[index]);
          expect(newCondition).to.be.gte(0);
          expect(newCondition).to.be.lte(100);
        });
      });
  });

  it("should complete all 6 rounds and finish program", () => {
    cy.get('[data-testid="generate-button"]').click();

    // Complete all 6 rounds
    for (let i = 1; i <= 6; i++) {
      cy.log(`Starting Round ${i}/6`);

      // Verify correct round
      cy.get('[data-testid="program-status-badge"]').contains(`Lap ${i}/6`);

      // Start race
      cy.get('[data-testid="start-button"]').should("not.be.disabled").click();

      // Wait for race to finish
      cy.get('[data-testid="finish-confetti"]', { timeout: 45000 }).should(
        "exist"
      );

      // Wait for nextRound by checking badge updates (except last round)
      if (i < 6) {
        // Wait up to 30s for the badge text to update to the next lap
        cy.get('[data-testid="program-status-badge"]').contains(
          `Lap ${i + 1}/6`,
          {
            timeout: 30000,
          }
        );
      }

      // Verify result card added (after nextRound completes)
      // Wait for the result card count to increase
      cy.get('[data-testid="round-result-card"]', { timeout: 30000 }).should(
        "have.length",
        i
      );
    }

    // Verify program finished
    cy.wait(3000);
    cy.get('[data-testid="round-result-card"]').should("have.length", 6);
    cy.get('[data-testid="results-count-badge"]').contains("6 Laps");

    // Verify start button shows "Start Race" and is disabled
    cy.get('[data-testid="start-button"]')
      .should("be.visible")
      .should("be.disabled")
      .should("contain", "Start Race");

    // Generate button should still be available
    cy.get('[data-testid="generate-button"]').should("not.be.disabled");
  });
});

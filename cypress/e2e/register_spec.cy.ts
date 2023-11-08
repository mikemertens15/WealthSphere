describe("Test register and loads dashboard", () => {
  it("Registers a new user", () => {
    cy.visit("/register");

    cy.get("input[name=name]").type("Cypress");
    cy.get("input[name=email]").type("cypressTest@email.com");
    cy.get("input[name=password]").type("cypressTest");
    cy.get("input[name=confirmPassword]").type("cypressTest");

    cy.get("input[name=name]").should("have.value", "Cypress");
    cy.get("input[name=email]").should("have.value", "cypressTest@email.com");
    cy.get("input[name=password]").should("have.value", "cypressTest");
    cy.get("input[name=confirmPassword]").should("have.value", "cypressTest");

    cy.get("button[type=submit]").click();
  });
});

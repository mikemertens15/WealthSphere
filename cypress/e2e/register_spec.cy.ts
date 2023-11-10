describe("Test register and loads dashboard", () => {
  it("Registers a new user", () => {
    cy.visit("/register");

    // fill in input fields
    cy.get("input[name=name]").type("Cypress");
    cy.get("input[name=email]").type("cypressTest@email.com");
    cy.get("input[name=password]").type("cypressTest");
    cy.get("input[name=confirmPassword]").type("cypressTest");

    // check if input fields have correct values
    cy.get("input[name=name]").should("have.value", "Cypress");
    cy.get("input[name=email]").should("have.value", "cypressTest@email.com");
    cy.get("input[name=password]").should("have.value", "cypressTest");
    cy.get("input[name=confirmPassword]").should("have.value", "cypressTest");

    // submit form
    cy.get("button[type=submit]").click();

    // check if user is redirected to dashboard
    cy.url().should("include", "/dashboard");

    // should display user's name on dashboard title
    cy.get("h1").should("contain", "Cypress's Dashboard");

    // budget widget should prompt to create a budget

    // net worth widget should prompt to link an account

    // transactions widget should prompt to link an account

    // logout button should be visible and log out user when clicked
    cy.get("button").contains("Logout").click();

    // check if user is redirected to login page
    cy.url().should("include", "/login");
  });
});

describe("Test login and loads dashboard with no linked accounts", () => {
  it("Logs in an already established user", () => {
    // visit login page
    cy.visit("/login");

    // fill in input fields
    cy.get("input[name=email]").type("admin_hasNoAccounts@admin.com");
    cy.get("input[name=password]").type("admin");

    // check if input fields have correct values
    cy.get("input[name=email]").should("have.value", "admin@admin.com");
    cy.get("input[name=password]").should("have.value", "admin");

    // submit form
    cy.get("button[type=submit]").click();

    // check if user is redirected to dashboard
    cy.url().should("include", "/dashboard");

    // should display user's name on dashboard title
    cy.get("h1").should("contain", "Mik's Dashboard");

    // budget widget should prompt to create a budget

    // net worth widget should prompt to link an account

    // transactions widget should prompt to link an account

    // logout button should be visible and log out user when clicked
    cy.get("button").contains("Logout").click();

    // check if user is redirected to login page
    cy.url().should("include", "/login");
  });
});

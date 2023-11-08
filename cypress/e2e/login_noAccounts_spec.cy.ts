describe("Test login and loads dashboard with no linked accounts", () => {
  it("Logs in an already established user", () => {
    cy.visit("/login");
    cy.get("input[name=email]").type("admin@admin.com");
    cy.get("input[name=password]").type("admin");
    cy.get("input[name=email]").should("have.value", "admin@admin.com");
    cy.get("input[name=password]").should("have.value", "admin");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/dashboard");
    cy.get("h1").should("contain", "Dashboard");
  });
});

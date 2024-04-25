describe("Header", () => {
  // Test to check if the 'Sign in' button redirects to the login page
  it("redirects to login page when 'Sign in' button is clicked", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("button", "Sign in").click({ force: true });
    cy.url().should("eq", "http://localhost:5173/login");
  });

  // Test for navigating to the register page through 'Sign out' button
  it("logs out the user and redirects to landing page when 'Sign out' button is clicked", () => {

    // Login to the page
    cy.visit("http://localhost:5173/login");
    cy.get("input[name=username]").type("test");
    cy.get("input[name=password]").type("testpassword");
    cy.contains("button", "Log in").click();

    // Sign out of the page
    cy.get("button[id=signOut]").click({ force: true });
    cy.url().should("eq", "http://localhost:5173/");
  });
});
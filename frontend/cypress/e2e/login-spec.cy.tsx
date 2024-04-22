// cypress/integration/login_spec.ts

describe("Login", () => {
  it("successfully loads the login page", () => {
    cy.visit("http://localhost:5173/login"); // change to your login page URL
  });

  it("can log in with correct credentials", () => {
    cy.visit("http://localhost:5173/login");

    // Replace these with the correct selectors for your login form
    cy.get("input[name=username]").type("test");
    cy.get("input[name=password]").type("testpassword");
    cy.contains('button', 'Log in').click();
  });
});
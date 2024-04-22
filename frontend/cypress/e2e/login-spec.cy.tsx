describe("Login", () => {
  it("successfully loads the login page", () => {
    cy.visit("http://localhost:5173/login");
  });

  it("can log in with correct credentials", () => {
    cy.visit("http://localhost:5173/login");

    cy.get("input[name=username]").type("test");
    cy.get("input[name=password]").type("testpassword");
    cy.contains('button', 'Log in').click();
  });
});

describe("Register", () => {
  it("successfully loads the register page", () => {
    cy.visit("http://localhost:5173/register");
  });

  it("can register with correct credentials", () => {
    cy.visit("http://localhost:5173/register");

    cy.get("input[name=username]").type("test");
    cy.get("input[name=password]").type("testpassword");
    cy.contains('button', 'Register').click();
  });
});
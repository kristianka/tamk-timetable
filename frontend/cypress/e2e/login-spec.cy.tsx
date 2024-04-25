// Login test with correct credentials
describe("Login with correct credentials", () => {
  it("successfully loads the login page", () => {
    cy.visit("http://localhost:5173/login");
  });

  it("can log in with correct credentials", () => {
    cy.visit("http://localhost:5173/login");

    cy.get("input[name=username]").type("test");
    cy.get("input[name=password]").type("testpassword");
    cy.contains("button", "Log in").click();
  });
});

// Login test with incorrect credentials
describe("Incorrect login credentials", () => {
  it("displays an error when incorrect credentials are entered", () => {
    cy.visit("http://localhost:5173/login");

    cy.get("input[name=username]").type("wrongusername");
    cy.get("input[name=password]").type("wrongpassword");
    cy.contains("button", "Log in").click();
    cy.contains("Invalid credentials. Please try again.").should("be.visible");
  });
});

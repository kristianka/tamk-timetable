// Registration test with a new user
describe("Register a user", () => {

  // Visit register page
  it("successfully loads the register page", () => {
    cy.visit("http://localhost:5173/register");
  });

  it("can register with correct credentials", () => {
    cy.visit("http://localhost:5173/register");

    // Input credentials into form
    cy.get("input[name=username]").type("test");
    cy.get("input[name=password]").type("testpassword");
    cy.contains("button", "Register").click();
  });
});

// Registration Test with Existing Username
describe("Registration with Existing Username", () => {
  it("displays an error when trying to register with an existing username", () => {

    // Visit register url
    cy.visit("http://localhost:5173/register");

    // Input credentials into form
    cy.get("input[name=username]").type("test");
    cy.get("input[name=password]").type("testpassword");
    cy.contains("button", "Register").click();
    cy.contains("Sorry, something went wrong. Please try again later.").should("be.visible");
  });
});
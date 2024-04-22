describe("Landing Page navigation", () => {
  it("navigates to login page when 'Login' button is clicked", () => {
    cy.visit("http://localhost:5173/");
    cy.contains('button', 'Login').click();
    cy.url().should('include', '/login');
  });

  it("navigates to register page when 'Register' button is clicked", () => {
    cy.visit("http://localhost:5173/");
    cy.contains('button', 'Register').click();
    cy.url().should('include', '/register');
  });
});
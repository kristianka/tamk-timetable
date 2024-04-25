// Timetable Addition Test
describe("Timetable Addition", () => {
  it("adds a course to the timetable", () => {
    // Visit the login page
    cy.visit("http://localhost:5173/login");

    // Type the username and password
    cy.get("input[name=username]").type("test");
    cy.get("input[name=password]").type("testpassword");

    // Click the "Log in" button
    cy.contains("button", "Log in").click();

    // Wait for the login operation to complete and store the token
    cy.window().then((win) => {
      const user = win.localStorage.getItem("user");
      if (user) {
        const obj = JSON.parse(user);
        win["token"] = obj.token;
      }
    });

    // Type the course code
    cy.get("input[name=courseCode]").type("5G00EV17-3003");

    // Click the "Submit" button
    cy.contains("button", "Submit").click();

    // Click the "Add to your timetable" button
    cy.contains("button", "Add to your timetable").click();
  });
});
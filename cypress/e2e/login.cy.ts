describe("Log in variants", () => {
  it("should log a user in successfully", () => {
    cy.visit("http://localhost:5173");
    cy.url().should("include", "/login");
    cy.get('input[name="email"]').type("darwinokuku@gmail.com");
    cy.get('input[name="password"]').type("Test12345");
    cy.contains("Log in").click();
    cy.get("#app-header").should("have.text", "Bluewood Care Portal");
  });

  it("should refuse to log in a user with an account that has not yet been approved/rejected", () => {
    cy.visit("http://localhost:5173");
    cy.get('input[name="email"]').type("user.7@devops-technology.com");
    cy.get('input[name="password"]').type("Test12345");
    cy.contains("Log in").click();
    cy.get(".mantine-Alert-message").should(
      "have.text",
      "Your account has not yet been approved. Please wait for an approval email and then log in."
    );
  });

  it("should refuse to log in a user with an approved account but has not set their account password", () => {
    cy.visit("http://localhost:5173");
    cy.get('input[name="email"]').type("user.5@devops-technology.com");
    cy.get('input[name="password"]').type("Test12345");
    cy.contains("Log in").click();
    cy.get(".mantine-Alert-message").should(
      "have.text",
      "You have not yet activated your account password. Please check your email for an activation link and use it to activate your account."
    );
  });

  it("should refuse to log in a user with a rejected account", () => {
    cy.visit("http://localhost:5173");
    cy.get('input[name="email"]').type("user.8@devops-technology.com");
    cy.get('input[name="password"]').type("Test12345");
    cy.contains("Log in").click();
    cy.get(".mantine-Alert-message").should(
      "have.text",
      "Your account request was rejected. Please reach out to your admin for further information."
    );
  });

  it("should refuse to log in a deactivated user", () => {
    cy.visit("http://localhost:5173");
    cy.get('input[name="email"]').type("user.6@devops-technology.com");
    cy.get('input[name="password"]').type("Test12345");
    cy.contains("Log in").click();
    cy.get(".mantine-Alert-message").should(
      "have.text",
      "Your account was deactivated. Please reach out to your admin to reactivate your account."
    );
  });

  it("should refuse to log in an existing user with incorrect password", () => {
    cy.visit("http://localhost:5173");
    cy.get('input[name="email"]').type("user.6@devops-technology.com");
    cy.get('input[name="password"]').type("WrongPassword");
    cy.contains("Log in").click();
    cy.get(".mantine-Alert-message").should(
      "have.text",
      "Incorrect email address or password."
    );
  });

  it("should not log in a non-existing user", () => {
    cy.visit("http://localhost:5173");
    cy.get('input[name="email"]').type("non-exising@user.com");
    cy.get('input[name="password"]').type("Test12345");
    cy.contains("Log in").click();
    cy.get(".mantine-Alert-message").should(
      "have.text",
      "Incorrect email address or password."
    );
  });
});

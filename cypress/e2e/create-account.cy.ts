describe("Create account spec", () => {
  it("should allow a superuser to create an account successfully", () => {
    cy.login();
    cy.get('button[id="create-new-user"]').click();
    cy.contains("label", "First Name").type("User");
    cy.contains("label", "Last Name").type("Six");

    cy.contains("label", "Email Address").type("darwinochumi38@gmail.com");
    cy.contains("label", "Phone Number").type("0728998090");
    cy.get('input[placeholder="Choose"]').click();
    cy.contains("Service User").click();
    cy.contains("Create User").click();
    cy.get(".mantine-Alert-message").should(
      "have.text",
      "The user has been successfully created and an activation email has been sent to their email address"
    );
  });
});

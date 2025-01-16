describe("authorization", () => {
  const testEmail = "ambroladzeika@gmail.com";
  const testPassword = "test123";
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="sign-in"]').click();
    cy.url().should("include", "sign-in");
    cy.get('[data-cy="sign-in-email"]').type(testEmail);
    cy.get('[data-cy="sign-in-password"]').type(testPassword);
    cy.get('[data-cy="submit"]').click();
  });

  it("logs user in successfully", () => {
    cy.get('[data-cy="sign-out"]').should("exist");
  });

  it("logs user out successfully", () => {
    cy.get('[data-cy="sign-out"]').click();
    cy.url().should("include", "sign-in");
  });
});

describe("sign-up", () => {
  it("signs user up successfully", () => {
    const testEmail = "somedefaulttest@user.com";
    const testPassword = "test123";

    cy.visit("/");
    cy.get('[data-cy="sign-up"]').click();
    cy.url().should("include", "sign-up");
    cy.get('[data-cy="sign-up-email"]').type(testEmail);
    cy.get('[data-cy="sign-up-password"]').type(testPassword);
    cy.get('[data-cy="submit"]').click();
    cy.url().should("include", "profile");
    cy.get('[data-cy="sign-out"]').should("exist");

    cy.request({
      method: "POST",
      url: "/api/delete-user",
      body: {
        email: testEmail,
        password: testPassword,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property(
        "message",
        "User deleted successfully.",
      );
    });
    cy.get('[data-cy="sign-out"]').click();
    cy.url().should("include", "sign-in");
  });
});

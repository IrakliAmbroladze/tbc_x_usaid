describe("authorization", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="sign-in"]').click();
    cy.url().should("include", "sign-in");
    cy.get('[data-cy="sign-in-email"]').type("ambroladzeika@gmail.com");
    cy.get('[data-cy="sign-in-password"]').type("test123");
    cy.get('[data-cy="sign-in-submit"]').click();
  });

  it("logs user in successfully", () => {
    cy.get('[data-cy="sign-out"]').should("exist");
  });

  it("logs user out successfully", () => {
    cy.get('[data-cy="sign-out"]').click();
    cy.url().should("include", "sign-in");
  });
});

describe("Smoke test", () => {
  it("works", () => {
    cy.visit("/");
    cy.contains("React").should("exist");
  });
});

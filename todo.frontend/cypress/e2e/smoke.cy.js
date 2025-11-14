describe("Smoke test", () => {
  it("loads the app", () => {
    cy.visit("http://localhost:3000");
    cy.contains("ToDoApp – TP07").should("exist");
  });
});

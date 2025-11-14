describe("Smoke test", () => {
  it("Carga la aplicación", () => {
    cy.visit("http://localhost:3000")

    // Verifica que el título principal existe
    cy.contains("ToDoApp – TP07").should("exist")

    // Verifica que el input de Nueva tarea existe
    cy.get('input[placeholder="Nueva tarea..."]').should("exist")

    // Verifica que el botón Agregar existe
    cy.contains("Agregar").should("exist")
  })
})

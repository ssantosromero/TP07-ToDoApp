describe('ToDoApp – TP07', () => {

  it('Carga la aplicación correctamente', () => {
    cy.visit('/');
    cy.contains('ToDoApp – TP07');
  });

  it('Permite agregar una nueva tarea', () => {
    cy.visit('/');
    cy.get('input[placeholder="Nueva tarea..."]').type('Hacer TP07');
    cy.contains('Agregar').click();
    cy.contains('Hacer TP07');
  });

  it('Permite marcar una tarea como completada', () => {
    cy.visit('/');
    cy.get('input[type="checkbox"]').first().check({ force: true });
    cy.contains('Completada');
  });

});

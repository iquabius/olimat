describe('Home page', () => {
  it('Shows a login button', () => {
    cy.visit('/');
    cy.root()
      .contains('Login')
      .should('have.attr', 'href', '/login');
  });
});

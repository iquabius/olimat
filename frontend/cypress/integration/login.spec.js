/// <reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.fixture('users/admin').as('admin');
  });

  // eslint-disable-next-line func-names
  it('should login an existing user', function() {
    cy.visit('/login');

    cy.get('input[name="email"]')
      .type(this.admin.email)
      .should('have.value', this.admin.email);

    cy.get('input[name="password"]')
      .type(this.admin.password)
      .should('have.value', this.admin.password);

    cy.get('button[type="submit"]').click();

    cy.location('pathname').should('eq', '/');
  });
});

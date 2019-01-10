/// <reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.fixture('users/admin').as('admin');
  });

  // eslint-disable-next-line func-names
  it('should login an existing user', function() {
    cy.visit('/')
      .getByText(/login/i)
      .click()
      .getByLabelText(/email/i)
      .type(this.admin.email)
      .getByLabelText(/senha/i)
      .type(this.admin.password)
      .getByLabelText(/entrar/i)
      .click()
      .assertHome()
      .assertLoggedIn();
  });
});

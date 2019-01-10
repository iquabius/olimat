/// <reference types="cypress" />
import faker from 'faker';

const user = {
  email: faker.internet.email(),
  name: faker.name.findName(),
  password: faker.internet.password(),
};

describe('Registration', () => {
  it('should register a new user', () => {
    cy.visit('/login')
      .getByText(/Crie a sua aqui/i)
      .click()
      .getByLabelText(/nome/i)
      .type(user.name)
      .getByLabelText(/email/i)
      .type(user.email)
      .getByLabelText(/confirmar email/i)
      .type(user.email)
      .getByLabelText(/senha/i)
      .type(user.password)
      .getByLabelText(/criar conta/i)
      .click();

    cy.location('pathname').should('eq', '/');
  });
});

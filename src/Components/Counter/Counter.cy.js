import React from 'react'
import { Counter } from './Counter'

describe('<Counter />', () => {
  it('should display initial value provided in props', () => {
    cy.mount(<Counter count="10"/>);

    cy.get('span').should('have.text', '10');
  });

  it('should decrement value after clicking "decrement" button', () => {
    cy.mount(<Counter />)
    cy.get('[data-cy=increment]').click()
    cy.get('span').should('have.text', '1')
  })
  
  it('should increament value after clicking "increament" button', () => {
    cy.mount(<Counter />)
    cy.get('[data-cy=decrement]').click()
    cy.get('span').should('have.text', '-1')
  })
})
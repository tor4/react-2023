describe('Search form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Search query should be updated after clicking "Search" button', () => {
        cy.get('input[name=searchQuery]').type('Horror');
        cy.get('[data-cy=search-form-subnit]').click();

        cy.get('[data-cy=requested-query]').should('have.text', 'Requested query: Horror');
    });

    it('Search query should be updated after pressing Enter', () => {
        cy.get('input[name=searchQuery]').type('Horror{enter}');

        cy.get('[data-cy=requested-query]').should('have.text', 'Requested query: Horror');
    });
});
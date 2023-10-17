import { DefaultMovie } from "./data";

describe('Movie list page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should filter movies by search query', () => {
    const searchQuery = 'pirates';
    cy.intercept({
      pathname: '/movies',
      query: {
        search: searchQuery,
      },
    }).as('searchFilter');
    cy.get('input[name=searchQuery]').type(searchQuery);
    cy.get('[data-cy=search-form-subnit]').click();

    cy.wait('@searchFilter');

    cy.get('.movie-tile')
      .find('h3')
      .should(($h3) => {
        [...$h3].forEach((h3) => {
          expect(h3.innerText.toUpperCase()).to.include(searchQuery.toUpperCase());
        })
      });
  });

  it('should filter movies by genre', () => {
    const genre = 'Comedy';
    cy.intercept({
      pathname: '/movies',
      query: {
        filter: genre,
      },
    }).as('genreFilter');

    cy.get('.GenreSelect button').eq(2).click()
      .should('has.class', 'selected');

    cy.wait('@genreFilter');

    cy.get('.movie-tile')
      .find('p')
      .should(($p) => {
        [...$p].forEach((p) => {
          expect(p.innerText).to.include(genre);
        })
      });
  });

  it('should sort movies', () => {
    const sortBy = 'title';
    cy.intercept({
      pathname: '/movies',
      query: {
        sortBy,
      },
    }, {
      data: [DefaultMovie]
    }).as('sortFilter');

    cy.get('.sort-control select').select(sortBy);
    cy.wait('@sortFilter');

    cy.get('.movie-tile')
      .find('h3')
      .should('have.text', DefaultMovie.title);
  });

  it('should display details of selected movies', () => {
    cy.get('.details-container').should('not.exist');

    cy.get('.movie-tile').first().click();

    cy.get('.details-container').within(() => {
      cy.get('.title').should('have.text', 'The Gold Rush');
      cy.get('.rating').should('have.text', '7.8');
    });
  });

  it('should return to search view after clicking on search icon', () => {
    cy.get('.search-container').should('be.visible');

    cy.get('.movie-tile').first().click();

    cy.get('.search-container').should('not.exist');

    cy.get('.icon.search').click();

    cy.get('.search-container').should('be.visible');
  });
});
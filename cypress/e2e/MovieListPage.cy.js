import { genres } from "../../src/Utils/constants";
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

    cy.location('search')
      .should((search) => {
        expect(search).to.contain('search=' + searchQuery);
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

    cy.location('search')
      .should((search) => {
        expect(search).to.contain('filter=' + genre);
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

    cy.location('search')
      .should((search) => {
        expect(search).to.contain('sortBy=' + sortBy);
      });
  });

  it('should display details of selected movies', () => {
    cy.intercept({
      pathname: '/movies/*',
    },
      DefaultMovie
    ).as('getMovie');

    cy.get('.details-container').should('not.exist');

    cy.get('.movie-tile').first().click();
    cy.wait('@getMovie');

    cy.get('.details-container').within(() => {
      cy.get('.title').should('have.text', DefaultMovie.title);
      cy.get('.rating').should('have.text', DefaultMovie.vote_average);
    });
  });

  it('should return to search view after clicking on search icon', () => {
    cy.get('.search-container').should('be.visible');

    cy.get('.movie-tile').first().click();

    cy.get('.search-container').should('not.exist');

    cy.get('.icon.search').click();

    cy.get('.search-container').should('be.visible');
  });

  it('should open Add new movie dialog after clicking on Add movie button', () => {
    cy.get('.add-movie').click();

    cy.get('.Dialog').should('be.visible');
    cy.get('.Dialog').find('input[name="releaseDate"]').should('have.value', '');
    cy.get('.Dialog').find('input[name="name"]').should('have.value', '');
    cy.get('.Dialog').find('input[name="imageUrl"]').should('have.value', '');
    cy.get('.Dialog').find('input[name="rating"]').should('have.value', '');
    cy.get('.Dialog').find('input[name="duration"]').should('have.value', '');
    cy.get('.Dialog').find('textarea[name="description"]').should('have.value', '');
    cy.get('.Dialog').find('select[name="genre"]').should('have.value', genres[0]);
  });

  it('should add new movie', () => {
    var todayDate = new Date().toISOString().slice(0, 10);
    cy.intercept({
      method: 'POST',
      pathname: '/movies',
    }).as('addMovie');

    cy.intercept('/movies/*').as('getMovie');

    cy.get('.add-movie').click();
    cy.get('.Dialog').find('input[name="name"]').type('The Green Mile');
    cy.get('.Dialog').find('input[name="releaseDate"]').type(todayDate);
    cy.get('.Dialog').find('input[name="imageUrl"]').type('https://www.kinopoisk.ru/14qwm6223');
    cy.get('.Dialog').find('input[name="rating"]').type('9.1');
    cy.get('.Dialog').find('input[name="duration"]').type('189');
    cy.get('.Dialog').find('textarea[name="description"]').type('description');
    cy.get('.Dialog').find('select[name="genre"]').select('Crime');

    cy.get('.Dialog').find('button[type="submit"]').click();

    cy.wait(['@addMovie', '@getMovie']);

    cy.location()
      .should((location) => {
        expect(location.pathname).to.contain('/movies/');
      });

    cy.get('.details-container').within(() => {
      cy.get('.title').should('have.text', 'The Green Mile');
      cy.get('.rating').should('have.text', '9.1');
    });

    cy.get('.movie-tile').first()
      .find('h3')
      .should('have.text', 'The Green Mile');
  });

  it('should open Edit movie dialog after clicking on Edit movie button', () => {
    cy.intercept({
      pathname: '/movies/*',
    },
      DefaultMovie
    ).as('getMovie');

    cy.get('.movie-tile').first()
      .find('.context-menu').click();

    cy.get('.movie-tile').first()
      .find('.context-menu .menu button.edit').click();

    cy.get('.Dialog').should('be.visible');
    cy.get('.Dialog').find('input[name="name"]').should('have.value', DefaultMovie.title);
    cy.get('.Dialog').find('input[name="releaseDate"]').should('have.value', DefaultMovie.release_date);
    cy.get('.Dialog').find('input[name="imageUrl"]').should('have.value', DefaultMovie.poster_path);
    cy.get('.Dialog').find('input[name="rating"]').should('have.value', DefaultMovie.vote_average);
    cy.get('.Dialog').find('input[name="duration"]').should('have.value', DefaultMovie.runtime);
    cy.get('.Dialog').find('textarea[name="description"]').should('have.value', DefaultMovie.overview);
  });
});
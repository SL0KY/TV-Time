describe('TV-Time', () => {
    it('Visit the page', () => {
      cy.visit('/');
      cy.get('button').contains('Get movie');   
    });

    it('get your first movie', () => {
        cy.get('button').click();
    });

    it('add a watched movie', () => {
        cy.get('.movie_proposal__btn1').click();
        cy.get('.movieItem').should('have.length', 1);
    });

    it('add a movie to watch', () => {
        cy.get('.movie_proposal__btn2').click();
        cy.get('.movieItemToWatch').should('have.length', 1);
    });

    it('go to watched movie list', () => {
        cy.get('.router1').click();
    });

    it('remove the first movie', () => {
        cy.get('.movieItemEdit__divRemove:first-child').click();
        cy.get('.movieItem').should('have.length', 0);
    });

    it('return to home and get movie', () => {
        cy.get('#nav router-link:first-child').click();
        cy.get('button').contains('Get movie'); 
    });

    it('go to to watch movie list', () => {
        cy.get('.router2').click();
    });
    
    it('remove the first movie', () => {
        cy.get('.movieItemEdit__divRemove:first-child').click();
        cy.get('.movieItem').should('have.length', 0);
    });
  });
describe('DKAN Homepage', () => {
  it('Loads a site', () => {
    cy.visit('/');
    cy.get('.dc-site-name a').should('have.text', 'Open Data Catalog');
  })
});

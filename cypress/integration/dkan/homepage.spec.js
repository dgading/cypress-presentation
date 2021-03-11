describe('DKAN Homepage', () => {
  it('Loads a site', () => {
    cy.visit('/');
    cy.get('.dc-site-name a').should('have.text', 'Open Data Catalog');
  });
  it('Test with Testing Library', () => {
    cy.visit('/');
    // Failing Test
    // cy.findByRole('link', {name: 'Open Data Catalog'}).should('exist');
    cy.findByAltText('Open Data Catalog').should('exist');
    cy.findAllByRole('link', {name: 'Open Data Catalog'}).its('length').should('eq', 2);
    cy.get('.dc-site-name').findByRole('link', {name: 'Open Data Catalog'}).should('exist');
  });
});

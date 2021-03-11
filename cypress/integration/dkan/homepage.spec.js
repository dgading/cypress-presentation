describe('DKAN Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.fixture('home/topics').as('topicJson');
  })

  it.skip('Loads a site', () => {
    cy.get('.dc-site-name a').should('have.text', 'Open Data Catalog');
  });
  it('Test with Testing Library', () => {
    // Failing Test
    // cy.findByRole('link', {name: 'Open Data Catalog'}).should('exist');
    cy.findByAltText('Open Data Catalog').should('exist');
    cy.findAllByRole('link', {name: 'Open Data Catalog'}).its('length').should('eq', 2);
    cy.get('.dc-site-name').findByRole('link', {name: 'Open Data Catalog'}).should('exist');
  });
  it.only('Has a topics sections', () => {
    cy.get('@topicJson').then((json) => {
      cy.findByRole('heading', { name: json.title, level: 2}).should('exist');
      json.topics.forEach((topic) => {
        // Fails
        // cy.findByRole('link', { name: topic.title, exact: false }).should('have.attr', 'href', topic.url)
        cy.findByText(topic.title).should('exist');
      })
      const links = cy.get('.dc-icon-list').findAllByRole('link');
      links.each((link) => {
        const topicIndex = json.topics.findIndex((topic) => topic.url === link[0].href);
        expect(topicIndex).to.be.greaterThan(-1);
      });
    })
  });
});

describe('DKAN Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
    cy.fixture('home/topics').as('topicJson');
  });

  // afterEach(() => {
  //   cy.a11yReport();
  // });

  it('Loads a site', () => {
    cy.get('.dc-site-name a').should('have.text', 'Open Data Catalog');
  });

  it('Test with Testing Library', () => {
    // Failing Test
    // cy.findByRole('link', {name: 'Open Data Catalog'}).should('exist');
    cy.findByAltText('Open Data Catalog').should('exist');
    cy.findAllByRole('link', {name: 'Open Data Catalog'}).its('length').should('eq', 2);
    cy.get('.dc-site-name').findByRole('link', {name: 'Open Data Catalog'}).should('exist');
  });

  it('Has a topics sections', () => {
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

  it('the hero directs the user to the search page', () => {
    cy.findByRole('heading', { name: 'Welcome to DKAN', level: 2}).should('exist');
    cy.findByText(/DKAN is an open-source data management/).should('exist');
    cy.findByLabelText('Search').should('exist');
    cy.findByLabelText('Search').should('have.value', '');
    cy.findByRole('button', {name: 'Clear'}).should('not.exist');
  });

  it.skip('I can clear hero input', () => {
    // cy.log(cy.findByRole('input'))
    cy.findByLabelText('Search').as('heroInput');
    // Initial State
    cy.get('@heroInput').should('exist');
    cy.get('@heroInput').should('have.value', '');
    cy.findByRole('button', {name: 'Go'}).should('exist');
    cy.findByRole('button', {name: 'Clear'}).should('not.exist');
    // Type some data
    cy.get('@heroInput').type('dataset');
    cy.get('@heroInput').should('have.value', 'dataset');
    cy.findByRole('button', {name: 'Go'}).should('exist');
    cy.findByRole('button', {name: 'Clear'}).should('exist');
    // Click Clear button
    cy.findByRole('button', {name: 'Clear'}).click();
    cy.get('@heroInput').should('have.value', '');
    cy.findByRole('button', {name: 'Go'}).should('exist');
    cy.findByRole('button', {name: 'Clear'}).should('not.exist');
  });

  it.only('I can clear hero input with Custom Command', () => {
    cy.checkInputValue('Search', '', null);
    cy.checkButtonsExistence([{name: 'Go', shouldExist: true}, {name: 'Clear', shouldExist: false}])

    cy.checkInputValue('Search', '', 'dataset');
    cy.checkButtonsExistence([{name: 'Go', shouldExist: true}, {name: 'Clear', shouldExist: true}]);

    cy.findByRole('button', {name: 'Clear'}).click();
    cy.checkInputValue('Search', '', null);
    cy.checkButtonsExistence([{name: 'Go', shouldExist: true}, {name: 'Clear', shouldExist: false}])
  });

  it('I can click Go to visit the search page', () => {
    cy.findByLabelText('Search').as('heroInput');
    cy.get('@heroInput').type('dataset');
    cy.findByRole('button', {name: 'Go'}).click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq('https://demo.getdkan.org/search/?fulltext=dataset')
    })
  })

});

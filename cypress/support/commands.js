import '@testing-library/cypress/add-commands';

Cypress.Commands.add('checkInputValue', (label, value, typeValue) => {
  const input = cy.findByLabelText(label);
  input.should('exist').and('have.value', value);
  if(typeValue) {
    input.type(typeValue)
    input.should('have.value', typeValue);
  }
});

Cypress.Commands.add('checkButtonsExistence', (buttons) => {
  buttons.forEach((button) => {
    const {name, shouldExist } = button;
    const thisButton = cy.findByRole('button', {name: name})
    if(shouldExist) {
      thisButton.should('exist');
    } else {
      thisButton.should('not.exist');
    }
  })
})

Cypress.Commands.add('a11yReport', () => {
  function terminalLog(violations) {
    cy.task(
      'log',
      `${violations.length} accessibility violation${
        violations.length === 1 ? '' : 's'
      } ${violations.length === 1 ? 'was' : 'were'} detected`
    )
    // pluck specific keys to keep the table readable
    const violationData = violations.map(
      ({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        nodes: nodes.length
      })
    )
  
    cy.task('table', violationData)
  }

  cy.checkA11y(null, null, terminalLog);
})
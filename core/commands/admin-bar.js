/**
 * Select required option from the 'Admin Bar'
 * @param {string} optionName - name of option to select form 'Admin Bar'. Expected: Edit, Comments, etc
 */
Cypress.Commands.add('selectBarOption', (optionName) => {
	cy.get(`#wp-admin-bar-${optionName.toLowerCase()}`).click().wait(500);
});

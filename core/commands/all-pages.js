/**
 * Search a page by provided title on 'All Pages' page
 * @param {string} pageTitle - title of a page to search
 */
Cypress.Commands.add('searchPage', (pageTitle) => {
	cy.navigateTo('Pages');
	cy.get('#post-search-input').clear().type(pageTitle).type('{enter}');
});

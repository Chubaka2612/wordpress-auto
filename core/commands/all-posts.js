/**
 * Search a post by provided title on 'All Posts' page
 * @param {string} postTitle - title of a post to search
 */
Cypress.Commands.add('searchPost', (postTitle) => {
	cy.navigateTo('Posts');
	cy.get('#post-search-input').clear().type(postTitle).type('{enter}');
});

/**
 * Perform action on a post searched by required title on 'All Posts' page
 * @param {string} postTitle - title of a post to search
 * @param {string} actionName - name of actions to be performed. Expected: View, Trash, Edit
 */
Cypress.Commands.add('performPostAction', (postTitle, actionName) => {
	cy.searchPost(postTitle);
	cy.get('td.column-title').first().realHover().find(`.${actionName.toLowerCase()}`).realClick();
});

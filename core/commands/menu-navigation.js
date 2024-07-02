/**
 * Navigate through 'Admin Menu'
 * @param {string} itemName - name of 'Admin Menu' item to select. Expected: Posts, Media, Plugins, etc.
 */
Cypress.Commands.add('navigateTo', (itemName) => {
	cy.get(`#menu-${itemName.toLowerCase()}`).then(($itemToSelect) => {
		if (!$itemToSelect.find('>a').hasClass('wp-menu-open')) {
			cy.wrap($itemToSelect).click();
		}
	});
});

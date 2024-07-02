/**
 * Search a plugin by provided name on 'All Plugins' page
 * @param {string} pluginName - title of a post to search
 */
Cypress.Commands.add('searchPlugin', (pluginName) => {
	cy.navigateTo('Plugins');
	cy.get('#plugin-search-input').clear().type(pluginName).type('{enter}');
});

/**
 * Perform action on a plugin searched by required name on 'All Plugins' page
 * @param {string} pluginName - name of a plugin to search
 * @param {string} actionName - name of actions to be performed. Expected: Activate, Deactivate, Delete, etc
 */
Cypress.Commands.add('performPluginAction', (pluginName, actionName) => {
	cy.searchPlugin(pluginName);
	cy.get('td.plugin-title')
		.first()
		.then(($row) => {
			//if is in already state (Activated/Deactivated) - skip a click
			if ($row.find(`.${actionName.toLowerCase()}`).length != 0) {
				cy.wrap($row.find(`.${actionName.toLowerCase()}`)).click();
			}
		});
});

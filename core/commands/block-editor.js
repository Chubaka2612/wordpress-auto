/**
 * Get IFrame of a block editor
 */
Cypress.Commands.add('switchToBlockEditorFrame', () => {
	return cy.get('iframe[name=editor-canvas]').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap);
});

/**
 * Insert a new block of required type
 * @param {string} blockType - type of a block to be inserted. Expected: List, Paragraph, Quotes, Heading, etcs
 * @returns - unique 'data-block' identifier for each new block
 */
Cypress.Commands.add('insertNewBlock', (blockType) => {
	cy.get("button.edit-post-header-toolbar__inserter-toggle[aria-pressed='false']").click();
	cy.get('.components-search-control__input').clear().type(`${blockType}`).type('{enter}').wait(500);
	cy.get(`.editor-block-list-item-${blockType.toLowerCase()}`).click();
	cy.get("button.edit-post-header-toolbar__inserter-toggle[aria-pressed='true']").click();
	return cy
		.switchToBlockEditorFrame()
		.find(`.wp-block-${blockType.toLowerCase()}`)
		.last()
		.invoke('attr', 'data-block')
		.then(cy.wrap);
});

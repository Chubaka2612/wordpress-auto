/**
 * Add a new post from the 'Post Editor' Page
 * @param {string} title - title of a post
 * @param {string} content - content of a post
 */
Cypress.Commands.add('addPost', (title, content) => {
	cy.navigateTo('Posts');
	cy.get('.page-title-action').click();
	if (typeof title != 'undefined') {
		cy.addPostTitle(title);
	}
	if (typeof content != 'undefined') {
		cy.insertNewBlock('Paragraph').then((identifier) => {
			cy.switchToBlockEditorFrame().find(`*[data-block="${identifier}"]`).clear().type(content);
		});
	}
});

/**
 * Add a post title on the 'Post Editor' Page
 * @param {string} title - title of a post
 */
Cypress.Commands.add('addPostTitle', (title) => {
	cy.switchToBlockEditorFrame().find('h1.editor-post-title__input').clear().type(title);
});

/**
 * Publish a new post from the 'Post Editor' Page
 */
Cypress.Commands.add('publishPost', () => {
	cy.get('button.editor-post-publish-panel__toggle').click({ delay: 100 });
	cy.get('button.editor-post-publish-button').click();
	cy.get('.components-snackbar').should('exist');
});

/**
 * Update an opened post from the 'Post Editor' Page
 */
Cypress.Commands.add('updatePost', () => {
	cy.get('button.editor-post-publish-button').click({ delay: 100 });
	cy.get('.components-snackbar').should('exist');
});

/**
 * View just created new post from the 'Post Editor' page
 */
Cypress.Commands.add('viewPost', () => {
	cy.get('.post-publish-panel__postpublish-buttons a').eq(0).click({ delay: 100 });
});

/**
 * Close 'Edit Post' mode
 */
Cypress.Commands.add('closePostEditMode', () => {
	cy.get('.edit-post-fullscreen-mode-close').click({ delay: 100 });
});

/**
 * Open post settings
 * @param {string} settingTab - setting tab to open. Expected: Post, Block, Page
 */
Cypress.Commands.add('openPostSettings', (settingTab) => {
	cy.get('.edit-post-header__settings button')
		.eq(2)
		.then(($button) => {
			if (!$button.hasClass('is-pressed')) {
				cy.get($button).click();
			}
		});
	cy.get(`.edit-post-sidebar__panel-tabs button[data-label='${settingTab}']`).then(($tab) => {
		//select only if is not active
		if (!$tab.hasClass('is-active')) {
			cy.wrap($tab).click();
		}
	});
});

/**
 * Switch type of opened post
 * @param {string} postType - type of post to select. Expected: Post, Page
 */
Cypress.Commands.add('switchPostType', (postType) => {
	cy.get('.components-panel__row')
		.filter(':contains("Post Type")')
		.find('.edit-post-post-visibility__toggle')
		.then((switcher) => {
			const actualText = switcher.text();
			const isAlreadySwithedType = actualText === postType;
			if (!isAlreadySwithedType) {
				cy.wrap(switcher).click();
				cy.get(`#editor-post-type-switcher-${postType.toLowerCase()}`).click();
			}
		});
});

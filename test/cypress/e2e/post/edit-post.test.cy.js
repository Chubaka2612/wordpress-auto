import generateTitle from '../../../../core/utils/data-generator';

describe('Creation and edition of a new post with blocks', () => {
	beforeEach(() => {
		//*** step#1 ***
		cy.login();
		cy.performPluginAction('Post Type Switcher', 'Activate');
	});

	it('Published post can be edited', () => {
		let postTitle = generateTitle();
		let postContent = 'Test Content/' + postTitle;
		let heading1Block = 'Heading#1/' + postTitle;
		let heading2Block = 'Heading#2/' + postTitle;
		let listBlockItems = [`Item#1/${postTitle}`, `Item#2/${postTitle}`];
		let postTitleNew = postTitle + ' Updated';
		let heading2BlockNew = 'Heading#2/' + postTitle + ' Updated';
		//*** step#2 ***
		//add new post with provided title and content
		cy.addPost(postTitle, postContent);

		//insert block#1 of 'heading' type
		cy.insertNewBlock('Heading').then((identifier) => {
			cy.switchToBlockEditorFrame().find(`*[data-block="${identifier}"]`).clear().type(heading1Block);
		});
		//insert block#2 of 'List' type
		cy.insertNewBlock('List').then((identifier) => {
			for (let i = 0; i < listBlockItems.length; i++) {
				const $listItem = cy
					.switchToBlockEditorFrame()
					.find(`*[data-block="${identifier}"]`)
					.find('li div[role="textbox"]')
					.eq(i);
				if (i === listBlockItems.length - 1) {
					$listItem.type(listBlockItems[i]); //to avoid empty last item
				} else {
					$listItem.type(`${listBlockItems[i]}{enter}`);
				}
			}
		});

		//*** step#3 ***
		//publish the post
		cy.publishPost();
		cy.viewPost();

		//*** step#4 ***
		//navigate to post view and validate content
		const postContentSelector = '.wp-block-post-content';
		const postTitleSelector = '.wp-block-group h1';
		cy.get(postTitleSelector).should('have.text', postTitle);
		cy.get(postContentSelector).should('exist').find('>p').should('have.text', postContent);
		cy.get(postContentSelector).find('h2').first().should('have.text', heading1Block);
		listBlockItems.forEach((listItem) => {
			cy.get(postContentSelector).find('ul li').contains(listItem);
		});

		//*** step#5 ***
		//navigate back to the editor from 'Admin Bar'
		cy.selectBarOption('Edit');
		//modify the post
		cy.addPostTitle(postTitleNew);
		//insert block#3 of 'Heading' type
		cy.insertNewBlock('Heading').then((identifier) => {
			cy.switchToBlockEditorFrame().find(`*[data-block="${identifier}"]`).clear().type(heading2Block);
		});
		cy.updatePost();
		cy.closePostEditMode();
		//check changes in 'View Mode'
		cy.performPostAction(postTitleNew, 'View');
		cy.get(postTitleSelector).should('have.text', postTitleNew);
		cy.get(postContentSelector).find('h2').last().should('have.text', heading2Block);

		//*** step#6 ***
		//modify the block#3 of 'Heading' type
		//find the block by unique text
		cy.selectBarOption('Edit');
		cy.switchToBlockEditorFrame()
			.find(postContentSelector)
			.find('h2')
			.filter(`:contains("${heading2Block}")`)
			.clear()
			.type(heading2BlockNew);
		cy.updatePost();
		//change post type to 'Page' type
		cy.openPostSettings('Post');
		cy.switchPostType('Page');
		cy.closePostEditMode();
		//verify Page type is present
		cy.searchPage(postTitleNew);
		cy.get('td.column-title').first().contains(postTitleNew);
	});
});

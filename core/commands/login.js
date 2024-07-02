/**
 * Login in to Wordpress
 * @param {string} username - name of user
 * @param {string} userpassowrd - password of user
 */
Cypress.Commands.add('login', (username = Cypress.env('adminusername'), password = Cypress.env('adminpassword')) => {
	cy.visit('/wp-admin/');
	cy.get('#user_login').clear().type(username);
	cy.get('#user_pass').clear().type(password);
	cy.get('#wp-submit').click();
});

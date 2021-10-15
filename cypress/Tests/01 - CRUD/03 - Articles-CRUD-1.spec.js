/* eslint-disable jest/valid-expect */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable jest/no-identical-title */
/* eslint-disable no-undef */
describe(`A user wants to handle an article`, () => {

	beforeEach(() => {
		cy.visit('http://localhost:3001')
			.get('.btn-hover.login.mb-1').click()
			.get('#Email').type('georges@groupomania.fr')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
	})

	it(`Publish an article with invalid data to control all validations then with valid data must be create an article`, () => {
		// With no data
		cy.get('.btn.btn-light').click()
		.get('.btn-form').click()
		.get('#error-message').should('have.text', 'Vous devez ajouter un message')
		// With no message
		.get('#genre').select('Culture')
		.get('.btn-form').click()
		.get('#error-message').should('have.text', 'Vous devez ajouter un message')
		// With no category
		.get('#message').type('test comment cypress !')
		.get('#genre').select('Sélectionnez une catégorie')
		.get('.btn-form').click()
		.get('#error-message').should('have.text', 'Veuillez sélectionner une catégorie')
		// With valid message and valid category
		.get('#genre').select('Culture')
		.get('.btn-form').click()
		.get('#menu-forum').children().first('button').click()
		// Check display new article
		.get('.m-0.card-text.comment').first().should('have.text', 'test comment cypress !')
		.get('.article-genre').first().should('have.text', 'Culture')
	})

	it(`Modify an article with invalid data to control all validations then with valid data must modify the content of the article`, () => {
		// With no message
		cy.get('.btn-admin').first().click()
			.get('.dropdown-menu.show').children('a').first().click()
			.wait(100)
			.get('#message').clear()
			.get('.btn-form').click()
			.get('#error-message').should('have.text', 'Vous devez ajouter un message')
			// With no category
			.wait(100)
			.get('#message').type('Test of modification comment with cypress !')
			.get('#genre').select('Sélectionnez une catégorie')
			.get('.btn-form').click()
			.get('#error-message').should('have.text', 'Veuillez sélectionner une catégorie')
			// With new valid message & new category
			.wait(100)
			.get('#genre').select('Santé')
			.get('.btn-form').click()
			.get('.article-genre').first().should('have.text', 'Santé')
		})	
})
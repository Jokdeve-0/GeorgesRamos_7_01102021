/* eslint-disable no-undef */
describe(`A user wants to handle an answer`, () => {
    beforeEach(() => {
		cy.visit('http://localhost:3001')
			.get('.btn-hover.login.mb-1').click()
			.get('#Email').type('max@groupomania.fr')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
	})
    it(`Publish an answer with invalid data to control all validations then with valid data must be create an answer`, () => {
        cy.get('.counter').click()
		// with no datas
		.get('.btn.btn-outline-secondary').eq(1).click()
		.get('#error-comment').should('have.text', 'Le commentaire est invalide!')
		// with invalid datas
        .get('.mb-3.input-group').children('input').type('[ hello you! ]')
		.get('.btn.btn-outline-secondary').eq(1).click()
		.get('#error-comment').should('have.text', 'Le commentaire est invalide!')
		// with valid datas
        .get('.mb-3.input-group').children('input').clear().type('hello you!')
		.get('.btn.btn-outline-secondary').eq(1).click()
		.get('.body-recomment.my-0.px-2.answer').should('have.text', 'hello you!')
	})
	it(`Modify an answer with invalid data to control all validations then with valid data must be modify an answer`, () => {
		cy.get('.counter').click()
        .get('.dropdown').eq(1).children('button').click()
        .get('.dropdown-item').first().click()
		// with no datas
		.get('.body-recomment.my-0.px-2.answer').children('div').first().children(' input').clear()
		.get('.icon-valid.h5').eq(1).click()
		.get('#error-comment').should('have.text', 'Le commentaire est invalide!')
		// With invalid datas
		.get('.body-recomment.my-0.px-2.answer').children('div').first().children(' input').type('[ This is my new answer ]')
		.get('.icon-valid.h5').eq(1).click()
		.get('#error-comment').should('have.text', 'Le commentaire est invalide!')
		// With valid datas
		.get('.body-recomment.my-0.px-2.answer').children('div').first().children(' input').clear().type('This is my new answer')
		.get('.icon-valid.h5').eq(1).click()
		.get('.body-recomment.my-0.px-2.answer').should('have.text', 'This is my new answer')
	})
})

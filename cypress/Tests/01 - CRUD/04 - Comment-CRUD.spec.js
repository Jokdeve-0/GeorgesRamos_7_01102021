/* eslint-disable no-undef */
describe(`A user wants to handle an comment`, () => {
    beforeEach(() => {
		cy.visit('http://localhost:3001')
			.get('.btn-hover.login.mb-1').click()
			.get('#Email').type('director@social.dev')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
	})
    it(`Publish an comment with invalid data to control all validations then with valid data must be create an comment`, () => {
        cy.get('.counter').first().click()
        // With no data
        .get('.btn.btn-outline-secondary').first().click()
        .get('#error-comment').should('have.text', 'Le commentaire est invalide!')
        // with valid datas
        .get('.input-comment').first().type('Mon commentaire !')
        .get('.btn.btn-outline-secondary').first().click()
        .get('.my-0.border.p-2.bg-light.comment').first().should('have.text','Mon commentaire !')
    })
    it(`Modify an comment with invalid data to control all validations then with valid data must be modify an comment`,()=>{
        cy.get('.counter').first().click()
        .get('.dropdown').eq(1).children('button').click()
        .get('.dropdown-item').first().click()
        // with no datas
        .get('.body-comment.my-0.px-2').children('div').first().children('input').clear()
        .get('.icon-valid.h5').first().click()
        .get('#error-comment').should('have.text', 'Le commentaire est invalide!')
        // with valid datas
        .get('.body-comment.my-0.px-2').children('div').first().children('input').type('hello world')
        .get('.icon-valid.h5').first().click()
        .get('.my-0.border.p-2.bg-light.comment').first().should('have.text','hello world')
    })
})

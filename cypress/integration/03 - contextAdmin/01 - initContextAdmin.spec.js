/* eslint-disable no-undef */
describe(`Initialization Context Admin`, () => {

    beforeEach(() => {
		cy.visit('http://localhost:3001')
			.get('.btn-hover.login.mb-1').click()
			
	})

    
    it(`James Publish a comment`, () => {
        cy.get('#Email').type('James@groupomania.fr')
        .get('#Password').type('Aa@0Aa@0')
        .get('.btn-form').click()
        .get('.counter').first().click()
        .get('.input-comment').first().type('Mon commentaire !')
        .get('.btn.btn-outline-secondary').first().click()
        .get('.my-0.border.p-2.bg-light.comment').first().should('have.text','Mon commentaire !')
    })
    
    it(`Max Publish a answer`, () => {
        cy.get('#Email').type('max@groupomania.fr')
        .get('#Password').type('Aa@0Aa@0')
        .get('.btn-form').click()
        .get('.counter').first().click()
        .get('.mb-3.input-group').children('input').clear().type('hello you!')
		.get('.btn.btn-outline-secondary').eq(1).click()
		.get('.body-recomment.my-0.px-2.answer').should('have.text', 'hello you!')
    })
    
})
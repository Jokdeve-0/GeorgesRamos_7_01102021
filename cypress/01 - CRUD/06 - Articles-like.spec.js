/* eslint-disable no-undef */
describe(`A user wants to like or dislike an article`, () => {
    beforeEach(() => {
		cy.visit('http://localhost:3001')
			.get('.btn-hover.login.mb-1').click()
			.get('#Email').type('max@groupomania.fr')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
	})
    it(`Like or dislike an article`, () => {
		// Like
        cy.get('.icon.up').click()
        .get('.icon.up').next().should('have.text',"1")
		// remove the like
        .get('.icon.up').click()
        .get('.icon.up').next().should('have.text',"0")
		// Dislike
        .get('.icon.down').click()
        .get('.icon.down').next().should('have.text',"1")
		// remove the dislike
        .get('.icon.down').click()
        .get('.icon.down').next().should('have.text',"0")
        .wait(100)
    })
})
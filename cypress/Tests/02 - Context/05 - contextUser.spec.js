/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
describe(`Display articles by User`, () => {
    beforeEach(() => {
		cy.visit('http://localhost:3001')
			.get('.btn-hover.login.mb-1').click()
			.get('#Email').type('max@groupomania.fr')
            .get('#Password').type('Aa@0Aa@0')
            .get('.btn-form').click()
	})
    it(`Display articles by User`, () => {
            cy.get('#aside-menu').children('nav').eq(1).children().first().click()
                .wait(100)
                .get('.pseudo').first().should('have.text','Directeur')
                .get('#aside-menu').children('nav').eq(1).children().eq(1).click()
                .wait(100)
                .get('.pseudo').first().should('have.text','Max')
    })
})
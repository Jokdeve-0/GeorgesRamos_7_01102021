/* eslint-disable jest/no-identical-title */
/* eslint-disable no-undef */

describe(`A user wants to display these articles on their account page`, () => {
	beforeEach(() => {
		cy.visit('http://localhost:3001')
	})

    it(`Display of these articles on his account page`,()=>{
        // login & redirect on Account page
        cy.get('.btn-hover.login.mb-1').click()
            .get('#Email').type('max@groupomania.fr')
            .get('#Password').type('Aa@0Aa@0')
            .get('.btn-form').click()
            .get('#container-forum')
            .get('.btn-hover.profile.mb-1').click()
            .get('.pseudo').first().should('have.text','Max')
    })
})
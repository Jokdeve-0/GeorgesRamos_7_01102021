/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
describe(`Display articles by Categories`, () => {
    beforeEach(() => {
		cy.visit('http://localhost:3001')
			.get('.btn-hover.login.mb-1').click()
			.get('#Email').type('max@groupomania.fr')
            .get('#Password').type('Aa@0Aa@0')
            .get('.btn-form').click()
	})
    it(`Display articles by catégorie`, () => {
            cy.get('#search').clear().type("Technologie").next().click()
            cy.wait(100)
            cy.get('.article-genre').should('have.text', "Technologie")
            
            // cy.get('.article-genre').first().then(($vote)=>{
                //     let recorveryValue = $vote[1]
                //     console.log($vote)
                // })
                cy.get('#search').clear().type("Télévision").next().click()
                cy.wait(100)
                cy.get('.article-genre').eq(0).should('have.text', "Télévision")
                cy.get('#search').clear().type("Vacances").next().click()
                cy.wait(100)
            cy.get('.article-genre').eq(0).should('have.text', "Vacances")
       
    })
})
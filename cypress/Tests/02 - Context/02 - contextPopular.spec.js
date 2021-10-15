/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
describe(`Display articles by the most popular`, () => {
    beforeEach(() => {
		cy.visit('http://localhost:3001')
			.get('.btn-hover.login.mb-1').click()
			.get('#Email').type('max@groupomania.fr')
            .get('#Password').type('Aa@0Aa@0')
            .get('.btn-form').click()
	})
    it(`Display by article the most popular`, () => {

        cy.get('.item-like').first().children().then(($vote)=>{
            let recorveryValue = $vote[1]
            console.log(parseInt(recorveryValue.innerText))
            cy.get('.item-like').first().children('span').should('have.text','0')
        })

        cy.get('#menu-forum').children().eq(1).click()

        cy.get('.item-like').first().children().then(($vote)=>{
            let recorveryValue = $vote[1]
            console.log(parseInt(recorveryValue.innerText))
            cy.get('.item-like').first().children('span').should('have.text','2')
        })

    })
})
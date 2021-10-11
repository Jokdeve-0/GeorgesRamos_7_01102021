/* eslint-disable jest/valid-expect */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect-in-promise */
describe(`A user wants to handle an article`, () => {

	beforeEach(() => {
		cy.visit('http://localhost:3001')
			.get('.btn-hover.login.mb-1').click()
			.get('#Email').type('director@social.dev')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
	})
    it(`Attempting to delete an article must remove the article with these comment and these answer`, () => {
        cy.get(".box-cards").children().then(($bef) => {
            const Before = $bef.length;
            cy.log(Before);
            cy.get('.m-0.card-text.comment').first().should('have.text', 'Test of modification comment with cypress !')
            .get('.btn-admin').first().click()
            .get('.dropdown-menu.show').children('a').eq(1).click()
            .get(".box-cards").children().then(($aft) => {
                const After = $aft.length;
                cy.log(After);
                if(Before === 1){
                    expect(After).to.deep.equal(Before)
                }else{
                    expect(After).to.deep.equal(Before -1)

                }
            })
        })
    })
})

/* eslint-disable no-undef */
describe(`A admin wants to moderate an comment`, () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001')
            .get('.btn-hover.login.mb-1').click()
            .get('#Email').type('director@social.dev')
            .get('#Password').type('Aa@0Aa@0')
            .get('.btn-form').click()
    })

    it(`Banned a comment`, () => {
        cy.get('.counter').first().click()
        .get('.dropdown').eq(1).children('button').click()
        .get('.dropdown-item').first().click()
        .wait(100)
        .get('.comment').eq(1).should('have.text', 'Ce commentaire à été banni !')
        .get('.dropdown').eq(1).children('button').click()
        .get('.dropdown-item').first().click()
        .wait(100)
        .get('.comment').eq(1).should('have.text', 'Mon commentaire !')
    })

})
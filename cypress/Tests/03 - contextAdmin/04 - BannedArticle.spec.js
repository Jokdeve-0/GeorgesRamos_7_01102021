/* eslint-disable no-undef */
describe(`A admin wants to moderate an article`, () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001')
            .get('.btn-hover.login.mb-1').click()
            .get('#Email').type('director@social.dev')
            .get('#Password').type('Aa@0Aa@0')
            .get('.btn-form').click()
    })

    it(`Banned a article`, () => {
        cy.get('.dropdown').first().children('button').click()
        .get('.dropdown-item').first().click()
        .wait(100)
        .get('.comment').first().should('have.text', 'Cette article ne respecte pas les règles du forum, veuillez contact l\'administrateur afin de corriger votre erreur ...')
        .get('.dropdown').first().children('button').click()
        .get('.dropdown-item').first().click()
        .wait(100)
        .get('.comment').first().should('have.text', 'article Télévision by cypress !')
    })

})
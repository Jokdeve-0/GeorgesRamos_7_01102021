/* eslint-disable no-undef */
describe(`A new user wishes to register on the company's social network`, () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001')
    })
    it(`The display of the elements of the home page and redirects to the registration page`, () => {
        cy.get('h1').should('have.text', "Le réseau Groupomania")
            .get('h2').should('have.text',"Vous souhaite la bienvenue !")
            .get('.card-text').should('have.text',"Un salon dédié à la rencontre entre collègues et collaborateurs.Partagez et discutez sur vos loisirs et sujets qui vous intéressent.")
    })
})
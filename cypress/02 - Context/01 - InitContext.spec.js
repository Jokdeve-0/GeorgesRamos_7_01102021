/* eslint-disable no-undef */

const createArticle = (cy,message,genre) => {
    cy.get('#message').type(message)
        .get('#genre').select(genre)
        .get('.btn-form').click()
        

}
 
describe(`Initialization Context Standard`, () => {
    beforeEach(() => {
		cy.visit('http://localhost:3001')
			.get('.btn-hover.login.mb-1').click()
			
	})
    it(`Max Publish one article`, () => {
        cy.get('#Email').type('max@groupomania.fr')
        .get('#Password').type('Aa@0Aa@0')
        .get('.btn-form').click()
        .get('.btn.btn-light').click()
        createArticle(cy,'article Télévision by cypress !',"Télévision")
    })
    it(`James Publish one article`, () => {
        cy.get('#Email').type('James@groupomania.fr')
        .get('#Password').type('Aa@0Aa@0')
        .get('.btn-form').click()
        cy.get('.btn.btn-light').click()
        createArticle(cy,'article vacances by cypress !',"Vacances")
    })
    it(`Directeur Publish one article`, () => {
        cy.get('#Email').type('director@social.dev')
        .get('#Password').type('Aa@0Aa@0')
        .get('.btn-form').click()
        cy.get('.btn.btn-light').click()
        createArticle(cy,'article Technologie by cypress !',"Technologie")
    })
    it(`Max Publish more one article`, () => {
        cy.get('#Email').type('max@groupomania.fr')
        .get('#Password').type('Aa@0Aa@0')
        .get('.btn-form').click()
        cy.get('.btn.btn-light').click()
        createArticle(cy,'article Télévision by cypress !',"Télévision")
    })
    it(`Max add like & dislike 1`, () => {   
        cy.get('#Email').type('max@groupomania.fr')
        .get('#Password').type('Aa@0Aa@0')
        .get('.btn-form').click() 
        .get('.icon.up').eq(1).click()
        .get('.icon.down').eq(2).click()
        .get('.icon.up').eq(3).click()
    })
    it(`James add like & dislike 2`,()=>{
        cy.get('#Email').type('james@groupomania.fr')
        .get('#Password').type('Aa@0Aa@0')
        .get('.btn-form').click()
        .get('.icon.up').eq(1).click()
        .get('.icon.down').eq(2).click()
        .get('.icon.down').eq(3).click()
    })
    it(`Directeur add like & dislike 3`,()=>{
        cy.get('#Email').type('director@social.dev')
        .get('#Password').type('Aa@0Aa@0')
        .get('.btn-form').click()
        .get('.icon.down').eq(2).click()
    })

})
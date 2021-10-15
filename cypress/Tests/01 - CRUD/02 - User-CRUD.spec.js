/* eslint-disable jest/no-identical-title */
/* eslint-disable no-undef */

const {clearSignup,clearLogin} = require('../../plugins/functions')

describe(`A standard user wants to manage an account on the company's social network`, () => {
	beforeEach(() => {
		cy.visit('http://localhost:3001')
	})
	// SIGNUP
	it(`Register user with invalid data to check all validations then with valid data so must create an account`, () => {
		cy.get('.btn-hover.signup.mb-1').click()
		// With no datas
		    .get('.btn-form').click()
			.get('#error-pseudo').should('have.text', 'Le pseudo est invalide!')
			.get('#error-email').should('have.text', 'L\'email est invalide!')
			.get('#error-password').should('have.text', 'Le password est invalide!')
		// With invalid Pseudo
		cy.get('#Pseudo').type('#testPseudo')
			.get('#Email').type('test@cypress.com')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
			.get('#error-pseudo').should('have.text', 'Le pseudo est invalide!')
			.not('#error-email')
			.not('#error-password')
		// With invalid Email
		clearSignup(cy)
		cy.get('#Pseudo').type('testPseudo')
			.get('#Email').type('test.cypress.com')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
			.not('#error-pseudo')
			.get('#error-email').should('have.text', 'L\'email est invalide!')
			.not('#error-password')
		// With invalid password
		clearSignup(cy)
		cy.get('#Pseudo').type('testPseudo')
			.get('#Email').type('test@cypress.com')
			.get('#Password').type('aa@0aa@0')
			.get('.btn-form').click()
			.not('#error-pseudo')
			.not('#error-email')
			.get('#error-password').should('have.text', 'Le password est invalide!')
		// With existing pseudo 
		clearSignup(cy)
		cy.get('#Pseudo').type('Directeur')
			.get('#Email').type('test@cypress.com')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
			.get('#error-pseudo').should('have.text', 'Le pseudo est déjà utilisé !')
			.not('#error-email')
			.not('#error-password')
		// With existing email
		clearSignup(cy)
		cy.get('#Pseudo').type('testPseudo')
			.get('#Email').type('director@social.dev')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
			.not('#error-pseudo')
			.get('#error-email').should('have.text', 'L\'email est déjà utilisé !')
			.not('#error-password')
		// With valid pseudo, email and password
		clearSignup(cy)
		cy.get('#Pseudo').type('Pseudo')
			.get('#Email').type('pseudo@social.dev')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
		// Check diplay the forum
			.get('#container-forum')
		// Lougout
			.get('.btn-hover.logout.mb-1.active').click()
	})
	// LOGIN
	it('Login with invalid data to check all validations then with valid data so must log in to the forum',()=>{
		cy.get('.btn-hover.login.mb-1').click()
		// 	With no datas
			.get('.btn-form').click()
			.get('#error-email').should('have.text', 'L\'email est invalide!')
			.get('#error-password').should('have.text', 'Le password est invalide!')
		// With invalid email
		cy.get('#Email').type('pseudo.social.dev')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
			.get('#error-email').should('have.text', 'L\'email est invalide!')
			.not('#error-password')
		// With invalid password
		clearLogin(cy)
		cy.get('#Email').type('pseudo@social.dev')
			.get('#Password').type('aa@0aa@0')
			.get('.btn-form').click()
			.not('#error-email')
			.get('#error-password').should('have.text', 'Le password est invalide!')
		// With incorrect email
		clearLogin(cy)
		cy.get('#Email').type('test@social.dev')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
			.get('#error-email').should('have.text', 'Identifiants incorrects')
		// With incorrect password
		clearLogin(cy)
		cy.get('#Email').type('pseudo@social.dev')
			.get('#Password').type('Ba@0Ba@0')
			.get('.btn-form').click()
			.get('#error-email').should('have.text', 'Identifiants incorrects')
		// With valid email and password
		clearLogin(cy)
		cy.get('#Email').type('pseudo@social.dev')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
			.get('#container-forum')
			.get('.btn-hover.logout.mb-1.active').click()
	})
	// MODIFICATION ACCOUNT
	it(`Modify his information data of his account with invalid data to verify all the validations then with valid data, he must modify the user's information data`,()=>{
		// login & redirect on Account page
		cy.get('.btn-hover.login.mb-1').click()
			.get('#Email').type('pseudo@social.dev')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
			.get('#container-forum')
			.get('.btn-hover.profile.mb-1').click()
			// MODIFY PSEUDO
			.get('.openPseudo').click()
			// Width no data
			.get('.icon-confirme').click()
			.get('#error-pseudo').should('have.text', 'Le pseudo est invalide!')
			// Width invalid pseudo
			.get('#Pseudo').type('@Pseudo')
			.get('.icon-confirme').click()
			.get('#error-pseudo').should('have.text', 'Le pseudo est invalide!')
			// Width existing pseudo
			.get('#Pseudo').clear().type('Directeur')
			.get('.icon-confirme').click()
			.get('#error-pseudo').should('have.text', 'Le pseudo est déjà utilisé !')
			// Width valid pseudo
			.get('#Pseudo').clear().type('NewPseudo')
			.get('.icon-confirme').click()
			.get('#dplPseudo').should('have.text', 'Nom d\'utilisateur " NewPseudo "')
			// MODIFY EMAIL
			.wait(100)
			.get('.openEmail').click()
			// Width no data
			.get('.icon-confirme').click()
			.get('#error-email').should('have.text', 'L\'email est invalide!')
			// Width invalid email
			.get('#Email').type('pseudo.social.dev')
			.get('.icon-confirme').click()
			.get('#error-email').should('have.text', 'L\'email est invalide!')
			// Width existing email
			.get('#Email').clear().type('director@social.dev')
			.get('.icon-confirme').click()
			.get('#error-email').should('have.text', 'L\'email est déjà utilisé !')
			// Width valid email
			.get('#Email').clear().type('georges@groupomania.fr')
			.get('.icon-confirme').click()
			.get('#dplEmail').should('have.text', 'Email " georges@groupomania.fr "')

	})
	// it(`Delete a user must delete all of their articles with their comments, responses and images and the user's account`,()=>{
    //     cy.visit('http://localhost:3001')
    //         .get('.btn-hover.login.mb-1').click()
    //         .get('#Email').type('georges@groupomania.fr')
    //         .get('#Password').type('Aa@0Aa@0')
    //         .get('.btn-form').click()
    //         .get('.btn-hover.profile.mb-1').click()
    //         .get('.icon-delete').click()
    //         .get('.toast-header') 
    // })
})
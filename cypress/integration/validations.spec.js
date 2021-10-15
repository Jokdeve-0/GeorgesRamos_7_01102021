/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect */
/* eslint-disable jest/no-identical-title */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/valid-expect-in-promise */

describe(`Check all the validations of the registration, connection, article, comment and answer form`, () => {
	beforeEach(() => {
		cy.viewport(1024, 1000)
		cy.visit('http://localhost:3001')
	})
	// SIGNUP
	it(`The validation of the fields of the registration form should display error messages`, () => {
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
		cy.get('#Pseudo').clear()
			.get('#Email').clear()
			.get('#Password').clear()
			.get('#Pseudo').type('testPseudo')
			.get('#Email').type('test.cypress.com')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
			.not('#error-pseudo')
			.get('#error-email').should('have.text', 'L\'email est invalide!')
			.not('#error-password')
		// With invalid password
		cy.get('#Pseudo').clear()
			.get('#Email').clear()
			.get('#Password').clear()
			.get('#Pseudo').type('testPseudo')
			.get('#Email').type('test@cypress.com')
			.get('#Password').type('aa@0aa@0')
			.get('.btn-form').click()
			.not('#error-pseudo')
			.not('#error-email')
			.get('#error-password').should('have.text', 'Le password est invalide!')
		// With existing pseudo 
		cy.get('#Pseudo').clear()
			.get('#Email').clear()
			.get('#Password').clear()
			.get('#Pseudo').type('Directeur')
			.get('#Email').type('test@cypress.com')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
			.get('#error-pseudo').should('have.text', 'Le pseudo est déjà utilisé !')
			.not('#error-email')
			.not('#error-password')
		// With existing email
		cy.get('#Pseudo').clear()
			.get('#Email').clear()
			.get('#Password').clear()
			.get('#Pseudo').type('testPseudo')
			.get('#Email').type('director@social.dev')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
			.not('#error-pseudo')
			.get('#error-email').should('have.text', 'L\'email est déjà utilisé !')
			.not('#error-password')
    })
    // LOGIN
	it('The validation of the fields of the login form should display error messages',()=>{
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
		cy.get('#Email').clear()
        	.get('#Password').clear()
			.get('#Email').type('pseudo@social.dev')
			.get('#Password').type('aa@0aa@0')
			.get('.btn-form').click()
			.not('#error-email')
			.get('#error-password').should('have.text', 'Le password est invalide!')
		// With incorrect email
		cy.get('#Email').clear()
        	.get('#Password').clear()
			.get('#Email').type('test@social.dev')
			.get('#Password').type('Aa@0Aa@0')
			.get('.btn-form').click()
			.get('#error-email').should('have.text', 'Identifiants incorrects')
		// With incorrect password
		cy.get('#Email').clear()
        	.get('#Password').clear()
			.get('#Email').type('pseudo@social.dev')
			.get('#Password').type('Ba@0Ba@0')
			.get('.btn-form').click()
			.get('#error-email').should('have.text', 'Identifiants incorrects')
    })
	// USER
	it('The validation of the fields of the personal information modification form should display error messages',()=>{
		// login
        cy.get('.btn-hover.login.mb-1').click()
		.get('#Email').type('director@social.dev')
		.get('#Password').type('Aa@0Aa@0')
		.get('.btn-form').click()
        .wait(200)
		.get('#container-forum')
			.get('.btn-hover.profile.mb-1').click()
			// MODIFY PSEUDO
			.get('.openPseudo').click()
			// Width no data
			.get('.icon-confirme').click()
			.get('#error-pseudo').should('have.text', 'Le pseudo est invalide!')
			.get('.icon-pen.notvalid').click()
			// Width invalid pseudo
			.get('.openPseudo').click()
			.get('#Pseudo').type('@Pseudo')
			.get('.icon-confirme').click()
			.get('#error-pseudo').should('have.text', 'Le pseudo est invalide!')
			.get('.icon-pen.notvalid').click()
			// Width existing pseudo
			.get('.openPseudo').click()
			.get('#Pseudo').clear().type('Directeur')
			.get('.icon-confirme').click()
			.wait(500)
			.get('#error-pseudo').should('have.text', 'Le pseudo est déjà utilisé !')
			.get('.icon-pen.notvalid').click()
			// Width valid pseudo
			.get('.openPseudo').click()
			.get('#Pseudo').clear().type('newPseudo')
			.get('.icon-confirme').first().click()
			.get('#dplPseudo').should('have.text', 'Nom d\'utilisateur " newPseudo "')
			// .get('.icon-pen.notvalid').click()
			.wait(500)
			.get('.openPseudo').click()
			.get('#Pseudo').clear().type('Directeur')
			.get('.icon-confirme').click()
			.wait(500)
			.get('#dplPseudo').should('have.text', 'Nom d\'utilisateur " Directeur "')
			// MODIFY EMAIL
			.get('.openEmail').click()
			// Width no data
			.get('.icon-confirme').click()
			.get('#error-email').should('have.text', 'L\'email est invalide!')
			.get('.icon-pen.notvalid').click()
			// Width invalid email
			.get('.openEmail').click()
			.get('#Email').type('pseudo.social.dev')
			.get('.icon-confirme').click()
			.get('#error-email').should('have.text', 'L\'email est invalide!')
			.get('.icon-pen.notvalid').click()
			// Width existing email
			.get('.openEmail').click()
			.get('#Email').clear().type('director@social.dev')
			.get('.icon-confirme').click()
			.get('#error-email').should('have.text', 'L\'email est déjà utilisé !')
			.get('.icon-pen.notvalid').click()
			// Width valid email
			.get('.openEmail').click()
			.get('#Email').clear().type('pseudo@social.dev')
			.get('.icon-confirme').click()
			.get('#dplEmail').should('have.text', 'Email " pseudo@social.dev "')
			// RESET  email
			.get('.openEmail').click()
			.get('#Email').clear().type('director@social.dev')
			.get('.icon-confirme').click()
			.get('#dplEmail').should('have.text', 'Email " director@social.dev "')

    })
    // ARTICLES COMMENTS ANSWERS
	it('The validation of the fields of the article creation and modification form should display error messages',()=>{
        // login
        cy.get('.btn-hover.login.mb-1').click()
		.get('#Email').type('director@social.dev')
		.get('#Password').type('Aa@0Aa@0')
		.get('.btn-form').click()
        .wait(200)
 // ARTICLE CREATE
        // With no data
		.get('.btn.btn-light').click()
		.get('.btn-form').click()
		.get('#error-message').should('have.text', 'Vous devez ajouter un message')
		// With no message
		.get('#genre').select('Culture')
		.get('.btn-form').click()
		.get('#error-message').should('have.text', 'Vous devez ajouter un message')
		// With no category
		.get('#message').type('test comment cypress !')
		.get('#genre').select('Sélectionnez une catégorie')
		.get('.btn-form').click()
		.get('#error-message').should('have.text', 'Veuillez sélectionner une catégorie')
        // With valid message and valid category
		.get('#genre').select('Culture')
		.get('.btn-form').click()
        .wait(100)
		// Check display new article
		.get('.m-0.card-text.comment').first().should('have.text', 'test comment cypress !')
		.get('.article-genre').first().should('have.text', 'Culture')
        .wait(100)
// ARTICLE MODIFY
        // With no message
		cy.get('.btn-admin').first().click()
        .get('.dropdown-menu.show').children('a').first().click()
        .wait(100)
        .get('#message').clear()
        .get('.btn-form').click()
        .get('#error-message').should('have.text', 'Vous devez ajouter un message')
        // With no category
        .wait(100)
        .get('#message').type('Test of modification comment with cypress !')
        .get('#genre').select('Sélectionnez une catégorie')
        .get('.btn-form').click()
        .get('#error-message').should('have.text', 'Veuillez sélectionner une catégorie')
        // With new valid message & new category
        .wait(100)
        .get('#genre').select('Santé')
        .get('.btn-form').click()
        .get('.article-genre').first().should('have.text', 'Santé')
// COMMENT CREATE
        // With no data
        .get('.btn.btn-outline-secondary').first().click()
        .get('#error-comment').should('have.text', 'Le commentaire est invalide!')
        // With invalid data
        .get('.btn.btn-outline-secondary').first().click()
        .get('.input-comment').first().type('[]')
        .get('#error-comment').should('have.text', 'Le commentaire est invalide!')
        // with valid datas
        .get('.input-comment').first().clear().type('Mon commentaire !')
        .get('.btn.btn-outline-secondary').first().click()
        .wait(1000)
        .get('.my-0.border.p-2.bg-light.comment').first().should('have.text','Mon commentaire !')
        .get('.dropdown').eq(1).children('button').click()
        .get('.dropdown-item').first().click()
// COMMENT MODIFY
        // with no datas
        .get('.body-comment.my-0.px-2').children('div').first().children('input').clear()
        .get('.icon-valid.h5').first().click()
        .get('#error-comment').should('have.text', 'Le commentaire est invalide!')
        // with valid datas
        .get('.body-comment.my-0.px-2').children('div').first().children('input').type('hello world')
        .get('.icon-valid.h5').first().click()
        .get('.my-0.border.p-2.bg-light.comment').first().should('have.text','hello world')
// ANSWER CREATE
        // with no datas
		.get('.btn.btn-outline-secondary').eq(1).click()
		.get('#error-comment').should('have.text', 'Le commentaire est invalide!')
		// with invalid datas
        .get('.mb-3.input-group').children('input').first().type('[ hello you! ]')
		.get('.btn.btn-outline-secondary').eq(1).click()
		.get('#error-comment').should('have.text', 'Le commentaire est invalide!')
		// with valid datas
        .get('.mb-3.input-group').children('input').first().clear().type('hello you!')
		.get('.btn.btn-outline-secondary').eq(1).click()
        .wait(100)
		.get('.body-recomment.my-0.px-2.answer').should('have.text', 'hello you!')
// ANSWER MODIFY
        .get('.dropdown').eq(2).children('button').click()
        .wait(100)
        .get('.dropdown-item').eq(3).click()
        // with no datas
		.get('.body-recomment.my-0.px-2.answer').children('div').first().children(' input').clear()
		.get('.icon-valid.h5').eq(1).click()
		.get('#error-comment').should('have.text', 'Le commentaire est invalide!')
		// With invalid datas
		.get('.body-recomment.my-0.px-2.answer').children('div').first().children(' input').type('[ This is my new answer ]')
		.get('.icon-valid.h5').eq(1).click()
		.get('#error-comment').should('have.text', 'Le commentaire est invalide!')
		// With valid datas
		.get('.body-recomment.my-0.px-2.answer').children('div').first().children(' input').clear().type('This is my new answer')
		.get('.icon-valid.h5').eq(1).click()
		.get('.body-recomment.my-0.px-2.answer').should('have.text', 'This is my new answer')
    })
	// RESET
    it(`Delete data created for testing`, () => {
        // login
        cy.get('.btn-hover.login.mb-1').click()
		.get('#Email').type('director@social.dev')
		.get('#Password').type('Aa@0Aa@0')
		.get('.btn-form').click()
        .wait(100)
        .get(".box-cards").children().then(($bef) => {
            const Before = $bef.length;
            cy.log(Before)
            .get('.btn-admin').first().click()
            .get('.dropdown-menu.show').children('a').eq(2).click()
            .wait(100)
            .get(".box-cards").children().then(($aft) => {
                const After = $aft.length;
                cy.log(After)
                if(Before === 1){
                    expect(After).to.deep.equal(Before)
                }else{
                    expect(After).to.deep.equal(Before -1)

                }
            })
        })
    })
})
exports.clearSignup = (cy) => {
    cy.get('#Pseudo').clear()
        .get('#Email').clear()
        .get('#Password').clear()
}
exports.clearLogin = (cy) => {
    cy.get('#Email').clear()
        .get('#Password').clear()
}
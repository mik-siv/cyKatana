const loginPage = {
    headerAuth: '.header__auth',
    loginContainer: '#login-container',
    emailInput: '[name="email"]',
    passwordInput: '[name="password"]',
    submitBtn: '[type="submit"]',

    logInUser: function (username, password){
        cy.get(this.headerAuth).contains('Sign in').should('be.visible').click();
        cy.get(this.loginContainer).then(e => {
            cy.wrap(e).find(this.emailInput).clear().type(username).should('be.visible');
            cy.wrap(e).find(this.passwordInput).clear().type(password).should('be.visible');
        })
        cy.get(this.submitBtn).should('be.visible').and('be.enabled').click();
    }
}

export default {...loginPage}
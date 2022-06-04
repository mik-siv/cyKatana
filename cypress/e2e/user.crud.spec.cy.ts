const credentials = require('../fixtures/credentials.json');

describe('User creation spec', {viewportHeight: 1080, viewportWidth: 1920}, function () {

    let someText = "Test" + Math.floor(Math.random() * 10000).toString();
    it('Open website and login', function () {
        cy.visit(credentials.url)
        cy.get('.header__auth').contains('Sign in').should('be.visible').click();
        cy.get('#login-container').then(e => {
            cy.wrap(e).find('[name="email"]').clear().type(credentials.username).should('be.visible');
            cy.wrap(e).find('[name="password"]').clear().type(credentials.password).should('be.visible');
        })
        cy.intercept('https://login.katanamrp.com/co/authenticate').as('login');
        cy.intercept('https://sales.katanamrp.com/api/salesOrderOpenLists*').as('getSalesList');
        cy.get('[type="submit"]').should('be.visible').and('be.enabled').click();
        cy.wait("@login").its("response.statusCode").should('eq', 200);
        cy.wait("@getSalesList", {timeout: 10000}).its("response.statusCode").should('eq', 200)
    })

    it('Add a new user', function () {
        cy.get('#globalAdd').should('be.visible').click();
        cy.get('#add-customer').should('be.visible').click();
        cy.get('.notSaved').should('be.visible');
        cy.get('[data-testid="inputCustomerDisplayName"]').clear().click().type(someText);
        cy.get('[data-testid="header-name-customer"]').should('contain', someText).and('be.visible');
    });
})
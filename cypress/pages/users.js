const globalPage = require('./main.js')
const usersPage = {
    firstName: '[data-testid="inputCustomerFirstName"]',
    lastName: '[data-testid="inputCustomerLastName"]',
    headerName: '[data-testid="header-name-customer"]',
    displayName: '[data-testid="inputCustomerDisplayName"]',
    email: '[data-testid="inputCustomerEmail"]',
    phone: '[data-testid="inputCustomerPhone"]',
    comment: '[data-testid="inputCustomerComment"]',
    company: '[data-testid="inputCustomerCompany"]',
    notSaved: '.notSaved',
    addressModal: '.MuiDialogContent-root',
    billingAddress: '[data-testid="inputCustomerDefaultBillingAddress"]',
    shippingAddress: '[data-testid="inputCustomerDefaultShippingAddress"]',
    removeAddress: '#removeAddress',

    fillUserData: function (userData){
        cy.get(this.notSaved).should('be.visible');
        cy.get(this.firstName).click().type(userData.firstName + '{enter}')
        cy.contains('All changes saved').should('be.visible');
        cy.get(this.lastName).click().type(userData.lastName + '{enter}')
        cy.get(this.headerName).should('contain', `${userData.firstName} ${userData.lastName}`).and('be.visible');
        cy.get(this.displayName).click().clear().type(userData.displayName);
        cy.get(this.headerName).should('contain', userData.displayName).and('be.visible');
        cy.get(this.email).click().type(userData.email + '{enter}', {delay: 50})
        cy.get(this.phone).click().type(userData.phone + '{enter}')
        cy.get(this.comment).click().type(userData.comment + '{enter}')
        cy.get(this.company).click().type(userData.company + '{enter}')
    },

    fillRandomAddress: function (address){
        cy.get(this.addressModal).find(globalPage.input).each(i => {
            cy.wrap(i).click().clear().type(address)
        })
        cy.get(globalPage.submitBtn).click();
    }
}

export default {...usersPage}
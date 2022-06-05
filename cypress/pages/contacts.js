const contacts = {
    row: '[role="row"]',
    contactName: '[col-id="name"]',
    contactPhone: '[col-id="phone"]',
    contactEmail: '[col-id="email"]',
    checkbox: '.ag-checkbox',

    deleteCustomerByName: function (name) {
        cy.contains(this.row, name).should('have.length', 1).find(this.checkbox).click()
        cy.contains('Bulk actions').should('be.visible').click();
        cy.contains('Delete').click();
        cy.contains(this.row, name).should('not.exist')
    }
}

export default {...contacts}
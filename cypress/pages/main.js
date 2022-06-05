const main = {
    input: 'input',
    submitBtn: '#submitButton',
    cancelBtn: '#cancelButton',
    contactsTab: '#contactsTab > .MuiTab-wrapper',
    accountInfo: '[data-testid="userInfoContainer"]',
    logoutBtn: '#logout',

    blockApiCallsByUrl: function (url) {
        cy.intercept(url, req => {
                req.destroy()
            }
        )
    },

    checkRequest: function (url, method, code) {
        cy.intercept({url: url, method: method}, (req) => {
            req.continue((res) => {
                expect(res.statusCode).to.eq(code)
            })
        })
    },

    logOut: function () {
        cy.get(this.accountInfo).click();
        cy.get(this.logoutBtn).click()
    }
}

export default {...main}
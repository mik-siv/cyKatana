import users from "../pages/users";

const credentials = require('../fixtures/credentials.json');
const Faker = require('faker');
const loginPage = require('../pages/loginPage.js');
const userPage = require('../pages/users.js');
const main = require('../pages/main.js');
const contacts = require('../pages/contacts.js');
const apiUrls = require('../fixtures/apiUrls.json')

describe('User creation spec', {viewportHeight: 1080, viewportWidth: 1920}, function () {

    let someText = Faker.random.words(2)
    let userData = {
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        comment: Faker.random.words(5),
        email: Faker.internet.email().toLowerCase(),
        phone: Faker.phone.phoneNumber('+372########'),
        displayName: Faker.random.word(),
        company: Faker.random.word(),
    }
    let newPhone = Faker.phone.phoneNumber('+372########');
    let newEmail = Faker.internet.email().toLowerCase();

    it('Open website and login', function () {
        cy.visit(credentials.url);
        main.checkRequest(apiUrls.auth, "POST", 200);
        main.checkRequest(apiUrls.salesOrders, "GET", 200);
        loginPage.logInUser(credentials.username, credentials.password);
    })

    it('Add a new user', function () {
        cy.get('#globalAdd').should('be.visible').click();
        cy.get('#add-customer').should('be.visible').click();
        main.checkRequest(apiUrls.customers, "GET", 200);
        userPage.fillUserData(userData);
        main.blockApiCallsByUrl(apiUrls.googleMapsApi);
        cy.get(users.billingAddress).click();
        userPage.fillRandomAddress(someText)
        cy.get(userPage.shippingAddress).click();
        cy.get(userPage.addressModal).should('be.visible');
        cy.get(main.cancelBtn).click()
        cy.contains('Add address').should('be.visible').click();
        cy.get(userPage.addressModal).should('be.visible');
        cy.get(main.cancelBtn).click();
    });

    it('Read and update the current customer', function () {
        main.checkRequest(apiUrls.customers, "PATCH", 200);
        cy.contains(main.contactsTab, 'Contacts').click();
        cy.contains(contacts.row, userData.displayName).find(contacts.contactPhone).should('contain', userData.phone).click().clear().type(newPhone + '{enter}');
        cy.contains(contacts.row, userData.displayName).find(contacts.contactEmail).should("not.be.empty").click().clear().type(newEmail + '{enter}');
        cy.contains(contacts.contactName, userData.displayName).should('have.length', 1).click();
        cy.get(userPage.billingAddress).should('include.text', someText).click();
        cy.get(userPage.removeAddress).click();
        cy.get(userPage.billingAddress).should('not.include.text', someText);
    });

    it('Delete customer', function () {
        cy.contains(main.contactsTab, 'Contacts').click();
        main.checkRequest(apiUrls.customers, "DELETE", 204);
        contacts.deleteCustomerByName(userData.displayName)
    });

    it('Adding a new customer from list button', function () {
        cy.contains('New customer').should('be.visible').click();
        cy.url().should("contain", 'https://factory.katanamrp.com/customer');
        cy.get(userPage.email).should('be.visible');
    });

    it('Log Out', function () {
        main.logOut()
    });
})
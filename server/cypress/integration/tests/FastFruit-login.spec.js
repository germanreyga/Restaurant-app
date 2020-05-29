describe('http://fruitcompany.rocks', ()=> {
    describe('Operations Based on Login', ()=> {
        it('Should be able to log in', () => {
            cy.visit('http://fruitcompany.rocks');
            cy.contains('Login').click();
            cy.get('#inputUsername').clear().type('admin');
            cy.get('#inputPassword').clear().type('admin');
            cy.get('#sendCredentials').click();
        });
        it('Should be able to order food', () => {
            cy.visit('http://fruitcompany.rocks');
            cy.contains('Login').click();
            cy.get('#inputUsername').clear().type('admin');
            cy.get('#inputPassword').clear().type('admin');
            cy.get('#sendCredentials').click();
            cy.contains('Order').click();
            cy.get('#qty0').clear().type(2);
            cy.get('#addItem0').click();
            cy.contains('Confirm order').click();
            cy.contains('SUBMIT ORDER').end();
        });
        it('Should be able to use the admin tools', () => {
            cy.visit('http://fruitcompany.rocks');
            cy.contains('Login').click();
            cy.get('#inputUsername').clear().type('admin');
            cy.get('#inputPassword').clear().type('admin');
            cy.get('#sendCredentials').click();
            cy.contains('Admin tools').click();
            cy.get('#inputUsername').clear().type('TEST');
            cy.get('#inputType').select('Employee');
            cy.get('#inputStore').select('FastFruit (CIE)');
            cy.get('#inputPassword').clear().type('PASS');
            cy.get('#inputConfirmPassword').clear().type('PASS');
            
        });
    })

})
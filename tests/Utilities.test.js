const Utilities = require('../models/Utilities');

describe('Test for check the functionality of this object', () => {

    const column = 'email';
    const userTestData = {
        name: "Alejandro Gómez García",
        nickname: "alex",
        email: "alejandro@gmail.com",
        password: "Alejandrom8"
    };
    const util = new Utilities();

    it('check if a column exists in the table of the database', async function(){
        const emailColExists = await util.checkIfColExists(column);
        expect(emailColExists).toBeDefined();
        expect(emailColExists).toBeTruthy();
    });

    it('should find a user by email', async function(){
        const theEmailAlredyExists = await util.searchCoincidencesFor(column, userTestData.email);
        expect(theEmailAlredyExists).toBeDefined();
        expect(theEmailAlredyExists).toBeTruthy();
    });
});
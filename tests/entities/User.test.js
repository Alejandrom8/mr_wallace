const User = require('../../models/User');
const ServiceResponse = require('../../entities/Response');

const userTestData = {
    "name": "Alejandro Gómez García",
    "nickname": "alex",
    "email": "alejandro@gmail.com",
    "password": "Alejandrom8"
};

describe('this test should describe the behavior of a user sign up', () => {

    const usr = new User({
        name: userTestData.name,
        password: userTestData.password,
        nickname: userTestData.nickname,
        email: userTestData.email
    });

    it('should find coincidences with other users', async () => {
        const result = await usr.searchUserConicidences('alex');
        expect(result.success).toBeTruthy();
        expect(result.data > 0).toBeTruthy();
    });

    it('should find the duplicates and refuse the sign up', async () => {
        const results = await usr.searchExistingUserData({
            nickname: usr.nickname,
            email: usr.email
        });
        expect(results[0]).toBeTruthy();
        expect(results[1]).toBe('nickname');
    });

    it('should encrypt the password', async () => {
        const passEnc = await usr.encryptPassword(usr.password);
        expect(passEnc).toBeDefined();
        expect(typeof passEnc).toBe('string');
        expect(passEnc.length > 30).toBeTruthy();
    });

    it('insert a user in the daatabase validating that is not duplicated and encrypting the password', async () => {
        const response = await usr.signup();
        let expected = new ServiceResponse();
        expected.message = expect.anything();
        expected.success = true;
        expect(response).toEqual(expected);
    });
});

describe('this test should describe the behavior of a user login', () => {

    const usr = new User({
        name: userTestData.name,
        password: userTestData.password,
        nickname: userTestData.nickname,
        email: userTestData.email
    });

    it('create an instance of user', () => {
        expect(usr).toBeDefined();
        expect(usr instanceof User).toBeTruthy();
    });

    it("validate the user", () => {
        const response = usr.validateData(userTestData);
        expect(response).toBeDefined();
        let expected = new ServiceResponse();
        expected.message = expect.anything();
        expected.success = true;
        expected.data = expect.anything();
        expect(response).toEqual(expected);
    });

    it('obtain the user password', async () => {
        const data = await usr.getUserPass();
        expect(data).toBeDefined();
        expect(typeof data).toBe('string');
    });

    it('validate that the pasword entered is equals to the password stored', async () => {
        const password = await usr.getUserPass();
        const passwordValidation = await usr.validatePassword(userTestData.password, password);
        expect(password).toBeDefined();
        expect(passwordValidation).toBeDefined();
        expect(passwordValidation).toBeTruthy();
    });

    it('should login the user', async () => {
        const validation = await usr.login();
        expect(validation).toBeDefined();
        let expected = new ServiceResponse();
        expected.message = "Autenticación correcta";
        expected.success = true;
        expected.data = expect.anything();
        expect(validation).toEqual(expected);
    });
});
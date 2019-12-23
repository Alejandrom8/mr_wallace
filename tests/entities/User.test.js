const User = require('../../models/User');

const userTestData = {
    "name": "Alejandro Gómez García",
    "nickname": "alex",
    "email": "ale.wild.ones@gmail.com",
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
        expect(response).toEqual({
            'message': expect.anything(),
            'status': true
        });
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
        expect(response).toStrictEqual({
            "message": '',
            "status": true,
            "data": expect.anything()
        });
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
        expect(validation).toEqual({
            "message": "Autenticación correcta",
            "status": true,
            'data': expect.anything()
        });
    });
});
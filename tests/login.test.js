const auth = require('../models/login');

test("Deberia poder logearse", () => {
    expect(auth({"nickname": "alex", "password": "Alejandrom8"})).toBe({"message": "Autenticación correcta", "status": true});
});
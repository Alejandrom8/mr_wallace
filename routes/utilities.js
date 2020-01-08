const utilities_model = require('../models/Utilities');

const utilities = {
    
    searchNicknameCoincidences: async (req, res, next) => {
        const util = new utilities_model();
        const nickname = req.body.nickname;
        const thereIsTheSameNickname = await util.searchCoincidencesFor('nick_name', nickname);
        res.json({
            "thereIsTheSameThing": thereIsTheSameNickname
        });
    },

    searchEmailCoincidences: async (req, res, next) => {
        const util = new utilities_model();
        const email = req.body.email;
        const thereIsTheSameEmail = await util.searchCoincidencesFor('email', email);
        res.json({
            "thereIsTheSameThing": thereIsTheSameEmail
        });
    }
}

module.exports = utilities;
const { userDB } = require('../dataBase');
const { statusCodes: { CREATED } } = require('../errors');

module.exports = {
    logedUser: (req, res, next) => {
        try {
            res.json('Congratulations you are succesfully logged in');
        } catch (e) {
            next(e);
        }
    }
};

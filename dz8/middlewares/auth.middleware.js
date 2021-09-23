const { ErrorHandler, statusCodes: { BAD_REQUEST, NOT_FOUND }, statusMessages: { WRONG_DATA } } = require('../errors');
const { userValidator: { authValidator } } = require('../validators');
const { userDB } = require('../dataBase');
const { passwordService: { comparePassword } } = require('../services');

module.exports = {
    validateAuth: (req, res, next) => {
        try {
            const { error } = authValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailPresent: async (req, res, next) => {
        try {
            const { email } = req.body;
            const isPresent = await userDB.findOne({ email });

            if (!isPresent) {
                throw new ErrorHandler(NOT_FOUND, WRONG_DATA);
            }
            req.user = isPresent;
            next();
        } catch (e) {
            next(e);
        }
    },

    comparePassword: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { user } = req;
            await comparePassword(password, user.password);

            next();
        } catch (e) {
            next(e);
        }
    }
};

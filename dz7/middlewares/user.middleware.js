const { statusCodes, statusMessages, ErrorHandler } = require('../errors');
const { userDB } = require('../dataBase');
const { userValidator: { createUserValidator, updateUserValidator } } = require('../validators');

module.exports = {
    isUserPresent: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new ErrorHandler(statusCodes.ALREADY_EXIST, statusMessages.ALREADY_EXIST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserNotPresent: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, statusMessages.NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByParams: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];
            const user = await userDB.findOne({ [dbField]: value });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;
            const isUnique = await userDB.findOne({ email });
            if (isUnique) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, `Email ${email} ${statusMessages.ALREADY_EXIST}`);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    validateCreateUser: (req, res, next) => {
        try {
            const { error } = createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUpdateUser: (req, res, next) => {
        try {
            const { error } = updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};

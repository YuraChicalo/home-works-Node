const { statusCodes, statusMessages, ErrorHandler } = require('../errors');
const { userDB } = require('../dataBase');
const { userValidator: { createUserValidator, updateUserValidator } } = require('../validators');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const currentUser = await userDB.findById(user_id);

            if (!currentUser) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, statusMessages.NOT_FOUND);
            }

            req.user = currentUser;
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

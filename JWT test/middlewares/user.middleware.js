const ErrorHandler = require("../errors/ErrorHandler");
const User = require('../dataBase/User');
const {ADMIN} = require("../config/user-roles.enum");
const {UserValidator} = require('../validators/user.validator')

module.exports = {
    isUserPresent: (req, res, next) => {
        try {
            const user = req.user;

            if (user) {
                throw new ErrorHandler(401, 'user already exist');
            }

            req.user = user;

            next();

        } catch (e) {
            next(e);
        }
    },

    isUserNotPresent: async (req, res, next) => {
        try {
            const user =  req.user;

            if (!user) {
                throw new ErrorHandler(418, 'user not found');
            }

            next();

        } catch (e) {
            next(e);
        }
    },

    checkUniqueEmail: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email: email})

            if (userByEmail) {
                throw new ErrorHandler(202, 'email already exist')
            }
            next()
        } catch (e) {
            next(e)
        }
    },

    validateUser: (req, res, next) => {
        try {
            const {error, value} = UserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(400, error.details[0].message)
            }

            console.log(value)
            next()
        } catch (e) {
            next(e)
        }
    },

    checkUserRole : (rolesArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!rolesArr.length) {
                return next();
            }

            if (!rolesArr.includes(role)) {
                throw new ErrorHandler(403, 'you dont have access')
            }

            next()
        } catch (e) {
            next(e)
        }
    },

    getUserByParams : (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await User.findOne({[dbField]: value})

            req.user = user;

            next()
        } catch (e) {
            next(e)
        }
    }
}

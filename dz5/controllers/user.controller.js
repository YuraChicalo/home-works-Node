const { statusCodes, statusMessages } = require('../errors');
const { userDB } = require('../dataBase');
const { passwordService: { hashPassword } } = require('../services');
const { userUtils: { userNormalizator } } = require('../utils');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const allUsers = await userDB.find({});
            res.json(allUsers);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;
            const normalUser = userNormalizator(user);
            res.json(normalUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hashedPassword = await hashPassword(password);

            const createdUser = await userDB.create({ ...req.body, password: hashedPassword });
            const normalCreatedUser = userNormalizator(createdUser);
            res.status(statusCodes.CREATED).json(normalCreatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await userDB.findByIdAndDelete(user_id);
            res.sendStatus(statusCodes.DELETED);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const updatedUser = await userDB.findByIdAndUpdate(user_id, req.body);
            userNormalizator(updatedUser);
            res.status(statusCodes.CREATED).json(statusMessages.USER_ID_UPDATE);
        } catch (e) {
            next(e);
        }
    }

};

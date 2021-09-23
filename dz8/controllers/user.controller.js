const { emailService: { sendEmail } } = require('../services');
const { CREATED, DELETED, UPDATED } = require('../errors/statusCodes');
const { userDB } = require('../dataBase');
const { passwordService: { hashPassword } } = require('../services');
const { userUtils: { userNormalizator } } = require('../utils');
const { emailActions: { WELCOME }, variables: { FRONTEND_URL } } = require('../config');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const allUsers = await userDB.find({});
            res.json(allUsers);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            await sendEmail('yura.chicalo2018@gmail.com', WELCOME, {
                userName: 'Yurii',
                frontendUrl: FRONTEND_URL
            });
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
            res.status(CREATED).json(normalCreatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await userDB.findByIdAndDelete(user_id);
            res.status(DELETED).json('user is deleted');
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const updatedUser = await userDB.findByIdAndUpdate(user_id, req.body);
            userNormalizator(updatedUser);
            res.status(UPDATED).json('user is updated');
        } catch (e) {
            next(e);
        }
    }

};

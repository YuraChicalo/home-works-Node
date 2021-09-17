const User = require('../dataBase/User');
const {userNormalizator} = require("../utils/user.utils");
const {hashPassword} = require('../services/password.service')

module.exports = {
    getSingleUser: (req, res, next) => {
        try {
            const {user} = req;
            const normalUser = userNormalizator(user);
            res.json(normalUser);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res) => {
        const users = await User.find({})
        res.json(users);
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hashedPassword = await hashPassword(password);

            const createdUser = await User.create({...req.body, password: hashedPassword});

            const normalUser = userNormalizator(createdUser);
            res.json(normalUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await User.findByIdAndDelete(user_id)

            res.json('user deleted');
        } catch (e) {
            next(e);
        }
    }
};

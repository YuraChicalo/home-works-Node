const {generateTokenPair} = require("../services/jwt.service");
const {compare} = require('../services/password.service')
const {userNormalizator} = require('../utils/user.utils')
const Oauth = require('../dataBase/Oauth')
const {AUTHORIZATION} = require("../config/variables");

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {user, body: {password}} = req;

            await compare(password, user.password);

            const tokenPair = generateTokenPair();

            await Oauth.create({...tokenPair, user: user._id})

            res.json({
                token: tokenPair,
                user: userNormalizator(user)
            })

            next()
        } catch (e) {
            next(e)
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION)

            await Oauth.deleteOne({ token })

            res.json('you are successfully logout')

        } catch (e) {
            next(e)
        }
    },
};

const { variables: { AUTHORIZATION } } = require('../config');
const { oauthDB } = require('../dataBase');
const { passwordService: { comparePassword } } = require('../services');
const { userUtils: { userNormalizator } } = require('../utils');
const { jwtService: { generateAuthTokenPair } } = require('../services');

module.exports = {
    logedUser: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await comparePassword(password, user.password);

            const tokenPair = generateAuthTokenPair();

            await oauthDB.create({ ...tokenPair, user: user._id });

            res.json({
                ...tokenPair,
                user: userNormalizator(user)
            });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await oauthDB.deleteOne({ access_token });

            res.json('You are successfully logout');
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {user} = req;

            const refresh_token = req.get(AUTHORIZATION);

            await oauthDB.deleteOne({ refresh_token });

            const tokenPair = await generateAuthTokenPair();

            await oauthDB.create({ ...tokenPair, user: user._id });

            res.json({
                ...tokenPair,
                user: userNormalizator(user)
            });
        } catch (e) {
            next(e);
        }
    }
};

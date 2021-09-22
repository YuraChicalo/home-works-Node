const { oauthDB } = require('../dataBase');
const { ErrorHandler, statusMessages: { ABSENT_TOKEN_DB, ABSENT_TOKEN }, statusCodes: { INVALID_TOKEN } } = require('../errors');
const { jwtService: { verifyAuthTokenPair } } = require('../services');
const { variables: { AUTHORIZATION } } = require('../config');

module.exports = {
    validateAuthAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(INVALID_TOKEN, ABSENT_TOKEN);
            }

            await verifyAuthTokenPair(access_token);

            const tokenFromDB = await oauthDB.findOne({ access_token });

            if (!tokenFromDB) {
                throw new ErrorHandler(INVALID_TOKEN, ABSENT_TOKEN_DB);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateAuthRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(INVALID_TOKEN, ABSENT_TOKEN);
            }

            await verifyAuthTokenPair(refresh_token, 'refresh');

            const tokenFromDB = await oauthDB.findOne({ refresh_token });

            if (!tokenFromDB) {
                throw new ErrorHandler(INVALID_TOKEN, ABSENT_TOKEN_DB);
            }

            req.user = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    }
};

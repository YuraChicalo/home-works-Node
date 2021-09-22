const jwt = require('jsonwebtoken');
const util = require('util');
const {ErrorHandler, statusCodes, statusMessages} = require("../errors");
const { variables: { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } } = require('../config');

const verifyPromise = util.promisify(jwt.verify);

module.exports = {
    generateAuthTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyAuthTokenPair: async (token, tokenType = 'access') => {
        try {
            const secretKey = tokenType === 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;
            await verifyPromise(token, secretKey);

        } catch (e) {
            throw new ErrorHandler(statusCodes.INVALID_TOKEN, statusMessages.INVALID_TOKEN)
        }
    }
};

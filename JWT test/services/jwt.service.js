const jwt = require('jsonwebtoken')
const ErrorHandler = require("../errors/ErrorHandler");
const { promisify } = require('util')
const {ACCESS_SECRET_KEY, REFRESH_SECRET_KEY} = require('../config/variables')

const verifyPromise = promisify(jwt.verify)
module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, {expiresIn: '15m'})
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, {expiresIn: '31d'})

        return {
            access_token,
            refresh_token
        }
    },

    verifyToken: async (token, tokenType = 'access') => {
        try {
            const secretKey = tokenType ==='access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;
            await verifyPromise(token, secretKey)

        } catch (e) {
            throw new ErrorHandler(401, 'Not valid token')
        }
    }
}

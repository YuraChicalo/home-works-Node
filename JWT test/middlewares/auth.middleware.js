const ErrorHandler = require("../errors/ErrorHandler");
const {verifyToken} = require("../services/jwt.service");
const {AUTHORIZATION} = require("../config/variables");
const Oauth = require('../dataBase/Oauth')

module.exports = {
    validateToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(401, 'token is absent')
            }

            await verifyToken(token)

            const tokenFromDB = await Oauth.findOne({access_token: token}).populate('user')

            console.log(tokenFromDB)

            if (!tokenFromDB) {
                throw new ErrorHandler(401, 'absent at DB')
            }

            next()

        } catch (e) {
            next(e)
        }
    }
}

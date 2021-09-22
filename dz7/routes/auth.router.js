const router = require('express').Router();

const { authController: { logedUser, logoutUser, refreshToken } } = require('../controllers');
const {
    userMiddleware: {
        getUserByParams,
        isUserNotPresent
    },
    authMiddleware: { validateAuthAccessToken, validateAuthRefreshToken }
} = require('../middlewares');

router.post('/', getUserByParams('email'), isUserNotPresent, logedUser);
router.post('/logout', validateAuthAccessToken, logoutUser);
router.post('/refresh', validateAuthRefreshToken, refreshToken);

module.exports = router;

const router = require('express').Router();
const { authMiddleware: { validateAuth, isEmailPresent, comparePassword } } = require('../middlewares');
const { authController: { logedUser } } = require('../controllers');

router.post('/', validateAuth, isEmailPresent, comparePassword, logedUser);

module.exports = router;

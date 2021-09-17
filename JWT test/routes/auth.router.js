const {validateToken} = require("../middlewares/auth.middleware");
const {logoutUser} = require("../controllers/auth.controller");
const router = require('express').Router();
const {loginUser} = require('../controllers/auth.controller')
const {getUserByParams, isUserNotPresent} = require('../middlewares/user.middleware')


router.post('/',getUserByParams('email'), isUserNotPresent, loginUser);
router.post('/logout', validateToken, logoutUser);

module.exports = router;

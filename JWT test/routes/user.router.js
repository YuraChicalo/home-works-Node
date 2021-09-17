const {validateToken} = require("../middlewares/auth.middleware");
const {deleteUser} = require("../controllers/user.controller");
const router = require('express').Router();
const {isUserPresent, isUserNotPresent, checkUniqueEmail, validateUser, checkUserRole, getUserByParams} = require('../middlewares/user.middleware')

const {createUser, getAllUsers, getSingleUser} = require('../controllers/user.controller');


router.post('/', checkUniqueEmail, validateUser, createUser);
router.get('/', getAllUsers);
router.get('/:user_id',
    getUserByParams('user_id', 'params', '_id'),
    isUserNotPresent,
    getSingleUser
);
router.delete('/:user_id',
    validateToken,
    getUserByParams('user_id', 'params', '_id'),
    isUserNotPresent,
    deleteUser
);

module.exports = router;

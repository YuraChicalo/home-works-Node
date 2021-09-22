const router = require('express').Router();
const {
    userMiddleware: {
        isUserNotPresent, isUniqueEmail, validateCreateUser, validateUpdateUser, getUserByParams
    },
    authMiddleware: {
        validateAuthAccessToken
    }
} = require('../middlewares');
const {
    userController: {
        getAllUsers, getUserById, createUser, deleteUser, updateUser
    }
} = require('../controllers');

router.get('/', getAllUsers);
router.post('/', validateCreateUser, isUniqueEmail, createUser);
router.get('/:user_id',
    getUserByParams('user_id', 'params', '_id'),
    isUserNotPresent,
    getUserById);
router.delete('/:user_id',
    validateAuthAccessToken,
    getUserByParams('user_id', 'params', '_id'),
    isUserNotPresent,
    deleteUser);
router.put('/:user_id', validateUpdateUser, updateUser);

module.exports = router;

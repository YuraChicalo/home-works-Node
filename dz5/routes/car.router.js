const router = require('express').Router();
const {
    carController: {
        getAllCars, getCarById, createCar, deleteCar, updateCar
    }
} = require('../controllers');

const { carMiddleware: { isCarPresent, validateCreateCar, validateUpdateCar } } = require('../middlewares');

router.get('/', getAllCars);
router.post('/', validateCreateCar, createCar);

router.get('/:car_id', isCarPresent, getCarById);
router.delete('/:car_id', isCarPresent, deleteCar);
router.put('/:car_id', validateUpdateCar, isCarPresent, updateCar);

module.exports = router;

const { carValidator: { createCarValidator, updateCarValidator } } = require('../validators');
const { statusCodes, statusMessages, ErrorHandler } = require('../errors');
const { carDB } = require('../dataBase');

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const currentCar = await carDB.findById(car_id);

            if (!currentCar) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, statusMessages.CAR_NOT_FOUND);
            }
            req.car = currentCar;
            next();
        } catch (e) {
            next(e);
        }
    },

    validateCreateCar: (req, res, next) => {
        try {
            const { error, value } = createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            console.log(value);
            next();
        } catch (e) {
            next(e);
        }
    },

    validateUpdateCar: (req, res, next) => {
        try {
            const { error, value } = updateCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            console.log(value);
            next();
        } catch (e) {
            next(e);
        }
    }
};

const joi = require('joi');
const { variables: { CURRENT_YEAR } } = require('../config');

const createCarValidator = joi.object({
    name: joi.string().alphanum().min(2).max(30)
        .required(),
    model: joi.string().alphanum().min(2).max(30)
        .required(),
    price: joi.number().min(0).max(150000),
    year: joi.number().min(CURRENT_YEAR - 35).max(CURRENT_YEAR),
});

const updateCarValidator = joi.object({
    name: joi.string().alphanum().min(2).max(30),
    model: joi.string().alphanum().min(2).max(30),
    price: joi.number().min(0).max(150000),
    year: joi.number().min(CURRENT_YEAR - 35).max(CURRENT_YEAR),
});

module.exports = {
    createCarValidator,
    updateCarValidator
};

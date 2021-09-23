const joi = require('joi');
const { variables: { CURRENT_YEAR }, regex: { PASSWORD_REGEXP, EMAIL_REGEXP } } = require('../config');

const createUserValidator = joi.object({
    name: joi.string().alphanum().min(2).max(30)
        .required(),
    birth_year: joi.number().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 6),
    email: joi.string().regex(EMAIL_REGEXP).required(),
    password: joi.string().regex(PASSWORD_REGEXP).required()
});

const updateUserValidator = joi.object({
    name: joi.string().alphanum().min(2).max(30),
    email: joi.string().regex(EMAIL_REGEXP)
});

const authValidator = joi.object({
    email: joi.string().regex(EMAIL_REGEXP).required(),
    password: joi.string().regex(PASSWORD_REGEXP).required()
});

module.exports = {
    authValidator,
    createUserValidator,
    updateUserValidator
};

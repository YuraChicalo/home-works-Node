const joi = require('joi');
const {current_year} = require('../config/variables')
const userRoles = require('../config/user-roles.enum')
const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../config/regex')

const girlValidator = joi.object({
    name: joi.string().alphanum().min(2).max(30).required(),
    age: joi.number().min(15).max(60)
})

const UserValidator = joi.object({
    name: joi.string().alphanum().min(2).max(30).required(),
    email: joi.string().regex(EMAIL_REGEXP).required(),
    password: joi.string().regex(PASSWORD_REGEXP).required(),
    birth_year: joi.number().min(current_year-120).max(current_year-6),
    role: joi.string().allow(...Object.values(userRoles)),

    car: joi.boolean(),

    girl: joi.array().items(girlValidator)
        .when('car', {is: true, then: joi.required()})

    // house: joi.alternatives().conditional('car', {is: true, then: joi.string(), otherwise: joi.number()})
})

const UpdateUser = joi.object({
    name: joi.string().alphanum().min(2).max(30),
    email: joi.string().regex(EMAIL_REGEXP)
})

module.exports = {
    UserValidator,
    UpdateUser
};

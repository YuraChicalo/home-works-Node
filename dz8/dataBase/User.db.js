const { Schema, model } = require('mongoose');
const { userRoles, schemas } = require('../config');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        trim: true,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    }
}, { timestamps: true });

module.exports = model('user', userSchema);

const { Schema, model } = require('mongoose');
const { schemas } = require('../config');

const carSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = model(schemas.CAR, carSchema);

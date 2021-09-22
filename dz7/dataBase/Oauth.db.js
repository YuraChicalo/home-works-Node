const { Schema, model } = require('mongoose');
const { schemas: { USER, Oauth } } = require('../config');

const OauthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }

}, { timestamps: true });

module.exports = model(Oauth, OauthSchema);

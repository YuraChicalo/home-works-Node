const bcrypt = require('bcrypt');
const { statusCodes: { BAD_REQUEST }, statusMessages: { WRONG_DATA }, ErrorHandler } = require('../errors');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePassword: async (password, hashedPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(BAD_REQUEST, WRONG_DATA);
        }
    }
};

module.exports = {
    userNormalizator: (userToNormalize) => {
        const fieldsToDelete = ['password'];

        userToNormalize = userToNormalize.toJSON();
        fieldsToDelete.forEach((field) => {
            delete userToNormalize[field];
        });
        return userToNormalize;
    }
};

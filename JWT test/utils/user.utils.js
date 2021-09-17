module.exports = {
    userNormalizator: (userToNormalize) => {
        const fieldsToRemove = ['password']
        userToNormalize = userToNormalize.toJSON();

        fieldsToRemove.forEach((fields) => {
            delete userToNormalize[fields]
        })
        return userToNormalize;
    }
}

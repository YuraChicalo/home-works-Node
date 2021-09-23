const { emailActions } = require('../config');

module.exports = {
    [emailActions.WELCOME]: {
        templateName: 'welcome',
        subject: 'welcome theme'
    },
    [emailActions.USER_BLOCKED_SOFT]: {
        templateName: 'USER_BLOCKED_SOFT',
        subject: 'welcome USER_BLOCKED_SOFT'
    },
    [emailActions.USER_BLOCKED_ADMIN]: {
        templateName: 'USER_BLOCKED_ADMIN',
        subject: 'welcome USER_BLOCKED_ADMIN'
    }
};

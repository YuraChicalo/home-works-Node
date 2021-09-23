const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { variables: { NO_REPLY_EMAIL, NO_REPLY_PASSWORD } } = require('../config');
const allTemplates = require('../email-templates');
const { ErrorHandler, statusCodes: { SERVER_ERROR }, statusMessages: { WRONG_TEMPLATE } } = require('../errors');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_PASSWORD
    }
});

const sendEmail = async (userEmail, emailAction, locals) => {
    const templatesInfo = allTemplates[emailAction];

    if (!templatesInfo) {
        throw new ErrorHandler(SERVER_ERROR, WRONG_TEMPLATE);
    }

    const { templateName, subject } = templatesInfo;

    const html = await templateParser.render(templateName, locals);

    return transporter.sendMail({
        from: 'no reply',
        to: userEmail,
        subject,
        html
    });
};

module.exports = {
    sendEmail
};

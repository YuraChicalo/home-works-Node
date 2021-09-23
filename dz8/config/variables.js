module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECTION: process.env.DB_CONNECTION || 'mongodb://localhost:27017/db_name',
    CURRENT_YEAR: new Date().getFullYear(),
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'email',
    NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD || '12345',
    FRONTEND_URL: process.env.FRONTEND_URL || 'url'
};

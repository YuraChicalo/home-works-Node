module.exports = {
    PORT: process.env.port || 5000,
    DB_CONNECTION: process.env.DB_CONNECTION || 'mongodb://localhost:27017/apr-2021',
    current_year: new Date().getFullYear(),
    ACCESS_SECRET_KEY: 'Secret',
    REFRESH_SECRET_KEY: 'S2',
    AUTHORIZATION: 'Authorization'
};

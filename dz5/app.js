const express = require('express');
const mongoose = require('mongoose');
const { statusCodes, statusMessages } = require('./errors');

const { variables: { PORT, DB_CONNECTION } } = require('./config');
const { authRouter, carRouter, userRouter } = require('./routes');

const app = express();

mongoose.connect(DB_CONNECTION);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => res.json('pong'));

app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);

app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log(`App listening ${PORT}`);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || statusCodes.NOT_FOUND,
        message: err.message || statusMessages.NOT_FOUND
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res.status(err.status || statusCodes.SERVER_ERROR).json(err.message);
}

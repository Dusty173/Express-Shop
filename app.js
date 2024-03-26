const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const routes = require('./routes')

app.use(express.json());
app.use('/items', routes);

app.use((req, res, next) => {
    return new ExpressError('Not Found', 404);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({error : err.message,});
});

module.exports = app;
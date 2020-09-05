const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
const payee = require('./routes/payee')
const users = require('./routes/users');
const jwt = require('jsonwebtoken');
const app = express();

app.set('secretKey', 'api');
app.use(bodyParser.urlencoded({ extended: false}));

//routes
app.use('/api', users);
app.use('/api', payee);

//port
app.listen(4000, function() {
    console.log('Node server listening on port 4000');
});
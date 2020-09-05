const mongoose = require('mongoose');
//connect
mongoose.connect('mongodb://localhost/BankingSystem',{  useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function () {
    console.log('DB Connected');
});

//export db
module.exports = db;
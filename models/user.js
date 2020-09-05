const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { ObjectId } = mongoose.Schema;


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },accountNo: {
        type: String,
        required: true
    }, 
    blnc:{
        type: Number,
        min: 0,
        required: true
    }
   

});

// hash the user password 
UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    this.confirm_password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

//export
module.exports = mongoose.model('User', UserSchema);
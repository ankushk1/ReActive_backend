const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;


const payeeSchema = new Schema({
    name: {
        type: String,

        required: true,
    },
    email: {
        type: String,
        required: true
    }, 
    accountNo: {
        type: Number,
        required: true
    }, 
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    
}, {
    timestamps: true
});

//export
module.exports = mongoose.model('Payee', payeeSchema)
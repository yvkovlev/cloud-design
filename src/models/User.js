const mongoose = require('mongoose');
const validate = require('mongoose-validator');
// const connection = require('../../app');
const connection = mongoose.createConnection('mongodb://localhost:27017/cloud-designDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const emailValidator = validate({
    validator: 'matches',
    arguments: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
})

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: emailValidator,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registration_date: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        required: true
    }
});
const User = connection.model('User', UserSchema);
module.exports = User;

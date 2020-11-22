const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: {
        type: Number,
        unique: true
    },
    mail: String,
    password: String,
    registration_date: Date,
    name: String
});

module.exports = mongoose.model('User', UserSchema);
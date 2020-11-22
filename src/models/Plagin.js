const mongoose = require('mongoose');

const PlaginSchema = mongoose.Schema({
    _id: Number,
    plagin_name: String,
    project_id: Number
});

module.exports = mongoose.model('Plagin', PlaginSchema);
const mongoose = require('mongoose');

const PlaginSchema = mongoose.Schema({
    _id: Number,
    plagin_name: {
        type: String,
        required: true
    },
    project_id: Number
});

module.exports = mongoose.model('Plagin', PlaginSchema);

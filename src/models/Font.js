const mongoose = require('mongoose');

const FontSchema = mongoose.Schema({
    _id: {
        type: Number,
        unique: true
    },
    font_name: String,
    project_id: Number
});

module.exports = mongoose.model('Font', FontSchema);
const mongoose = require('mongoose');

const FontSchema = mongoose.Schema({
    _id: Number,
    font_name: {
        type: String,
        required: true
    },
    project_id: Number
});

module.exports = mongoose.model('Font', FontSchema);

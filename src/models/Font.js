const mongoose = require('mongoose');

const FontSchema = mongoose.Schema({
    font_name: {
        type: String,
        required: true
    },
    project_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Project'
    }
});

module.exports = mongoose.model('Font', FontSchema);

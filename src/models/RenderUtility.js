const mongoose = require('mongoose');

const RenderUtilitySchema = mongoose.Schema({
    _id: Number,
    renderutility_name: {
        type: String,
        required: true
    },
    project_id: Number
});

module.exports = mongoose.model('Renderutility', RenderUtilitySchema);

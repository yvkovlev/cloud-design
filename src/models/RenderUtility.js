const mongoose = require('mongoose');

const RenderUtilitySchema = mongoose.Schema({
    _id: {
        type: Number,
        unique: true
    },
    renderutility_name: String,
    project_id: Number
});

module.exports = mongoose.model('Renderutility', RenderUtilitySchema);
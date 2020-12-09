const mongoose = require('mongoose');

const RenderUtilitySchema = mongoose.Schema({
    renderutility_name: {
        type: String,
        required: true
    },
    project_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Project'
    }
});

module.exports = mongoose.model('Renderutility', RenderUtilitySchema);

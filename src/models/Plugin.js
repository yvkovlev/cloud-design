const mongoose = require('mongoose');

const PluginSchema = mongoose.Schema({
    plugin_name: {
        type: String,
        required: true
    },
    project_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Project'
    }
});

module.exports = mongoose.model('Plugin', PluginSchema);

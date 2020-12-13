const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/cloud-designDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const FontSchema = mongoose.Schema({
    font_name: {
        type: String,
        required: true
    }
});

module.exports = connection.model('Font', FontSchema);

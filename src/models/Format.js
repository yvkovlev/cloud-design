const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/cloud-designDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const FormatSchema = mongoose.Schema({
  id: String,
  name: {
    type: String,
    required: true
  }
});

module.exports = connection.model('Format', FormatSchema);
